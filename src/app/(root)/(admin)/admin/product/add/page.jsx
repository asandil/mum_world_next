"use client";
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from "@/routes/AdminPanelRoute";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import imgPlaceholder from "@/assets/images/img-placeholder.webp";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import Select from "@/components/Application/Select";
import Editor from "@/components/Application/Admin/Editor";
import MediaModal from "@/components/Application/Admin/MediaModal";
import debounce from "lodash/debounce";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_SHOW, label: "Products" },
  { href: "", label: "Edit Product" },
];

const EditProduct = ({ params }) => {
  const router = useRouter();
  const { id } = useParams(params);

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedMedia, setSelectedMedia] = React.useState([]);

  // Fetch category and product data
  const { data: getCategory, loading: categoryLoading } = useFetch(
    `/api/category?deleteType=SD&size=1000`
  );

  const { data: getProduct, loading: getProductLoading } = useFetch(
    `/api/product/get/${id}`
  );

  // Memoize category options
  const categoryOptions = useMemo(() => {
    if (!getCategory?.success) return [];
    return getCategory.data.map((cat) => ({ 
      label: cat.name, 
      value: cat._id 
    }));
  }, [getCategory]);

  // Form schema and initialization
  const formSchema = zSchema.pick({
    _id: true,
    name: true,
    slug: true,
    category: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,
    description: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: id,
      name: "",
      slug: "",
      category: "",
      mrp: 0,
      sellingPrice: 0,
      discountPercentage: 0,
      description: "",
    },
  });

  // Debounced slug generation
  const generateSlug = useCallback(
    debounce((name) => {
      if (name) {
        const slug = slugify(name, { 
          lower: true, 
          strict: true,
          trim: true 
        });
        form.setValue("slug", slug, { shouldValidate: true });
      }
    }, 300),
    [form]
  );

  // Handle product data initialization
  useEffect(() => {
    if (getProduct?.success) {
      const product = getProduct.data;
      
      form.reset({
        _id: product._id || id,
        name: product.name || "",
        slug: product.slug || "",
        category: product.category || "",
        mrp: product.mrp || 0,
        sellingPrice: product.sellingPrice || 0,
        discountPercentage: product.discountPercentage || 0,
        description: product.description || "",
      });

      if (product.media?.length > 0) {
        const media = product.media.map((item) => ({
          _id: item._id,
          url: item.secure_url,
        }));
        setSelectedMedia(media);
      }
    }
  }, [getProduct, id, form]);

  // Watch for name changes to generate slug
  const nameValue = form.watch("name");
  useEffect(() => {
    generateSlug(nameValue);
  }, [nameValue, generateSlug]);

  // Calculate discount percentage
  const mrpValue = form.watch("mrp");
  const sellingPriceValue = form.watch("sellingPrice");
  useEffect(() => {
    const mrp = parseFloat(mrpValue) || 0;
    const sellingPrice = parseFloat(sellingPriceValue) || 0;

    if (mrp > 0 && sellingPrice > 0 && sellingPrice <= mrp) {
      const discountPercentage = ((mrp - sellingPrice) / mrp) * 100;
      form.setValue("discountPercentage", Math.round(discountPercentage * 100) / 100);
    } else {
      form.setValue("discountPercentage", 0);
    }
  }, [mrpValue, sellingPriceValue, form]);

  // Editor change handler
  const handleEditorChange = useCallback((event, editor) => {
    const data = editor.getData();
    form.setValue("description", data, { shouldValidate: true });
  }, [form]);

  // Form submission
  const onSubmit = async (values) => {
    if (selectedMedia.length === 0) {
      showToast("error", "Please select at least one media file.");
      return;
    }

    setLoading(true);
    try {
      const mediaIds = selectedMedia.map((media) => media._id);
      const payload = {
        ...values,
        media: mediaIds,
      };

      const { data: response } = await axios.put(`/api/product/update`, payload);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      showToast("success", response.message);
      router.push(ADMIN_PRODUCT_SHOW);
    } catch (error) {
      showToast("error", error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (getProductLoading || categoryLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading product data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BreadCrumb breadCrumbData={breadCrumbData} />
      
      <Card className="rounded-lg shadow-sm border">
        <CardHeader className="border-b pb-4">
          <h4 className="text-xl font-semibold">Edit Product</h4>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter product name"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug Field */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Slug <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Product slug"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category Field */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Category <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          options={categoryOptions}
                          selected={field.value}
                          setSelected={field.onChange}
                          isMulti={false}
                          isLoading={categoryLoading}
                          isDisabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* MRP Field */}
                <FormField
                  control={form.control}
                  name="mrp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        MRP <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Enter MRP"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Selling Price Field */}
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Selling Price <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Enter Selling Price"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Discount Percentage Field */}
                <FormField
                  control={form.control}
                  name="discountPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Percentage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          readOnly
                          placeholder="Auto-calculated"
                          {...field}
                          className="bg-gray-50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description Editor */}
              <div className="space-y-2">
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                {!getProductLoading && (
                  <Editor
                    onChange={handleEditorChange}
                    initialData={form.getValues("description")}
                    disabled={loading}
                  />
                )}
                <FormMessage />
              </div>

              {/* Media Selection */}
              <div className="border border-dashed rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <MediaModal
                    open={open}
                    setOpen={setOpen}
                    selectedMedia={selectedMedia}
                    setSelectedMedia={setSelectedMedia}
                    isMultiple={true}
                  />
                </div>

                {/* Selected Media Preview */}
                {selectedMedia.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-4">
                    {selectedMedia.map((media) => (
                      <div
                        key={media._id}
                        className="relative h-24 w-24 border rounded-lg overflow-hidden"
                      >
                        <Image
                          src={media.url}
                          alt="Product media"
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Media Selector Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    disabled={loading}
                    className="px-6 py-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="font-semibold">
                      {selectedMedia.length > 0 
                        ? `Selected ${selectedMedia.length} media files` 
                        : "Select Media"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Save Changes"
                  className="w-full md:w-auto min-w-[150px]"
                  disabled={loading}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
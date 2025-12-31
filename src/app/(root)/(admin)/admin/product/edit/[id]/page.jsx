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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import Select from "@/components/Application/Select";
import Editor from "@/components/Application/Admin/Editor";
import MediaModal from "@/components/Application/Admin/MediaModal";

const BREADCRUMB_DATA = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_PRODUCT_SHOW, label: "Products" },
  { href: "", label: "Edit Product" },
];

const FORM_SCHEMA = zSchema.pick({
  _id: true,
  name: true,
  slug: true,
  category: true,
  mrp: true,
  sellingPrice: true,
  discountPercentage: true,
  description: true,
});

const EditProduct = ({ params }) => {
  const router = useRouter();
  const { id } = useParams(params);
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  // Fetch data with error handling
  const { 
    data: getCategory, 
    loading: categoryLoading,
    error: categoryError 
  } = useFetch(`/api/category?deleteType=SD&size=1000`);

  const { 
    data: getProduct, 
    loading: getProductLoading,
    error: productError 
  } = useFetch(`/api/product/get/${id}`);

  // Memoize category options
  const categoryOptions = useMemo(() => {
    if (!getCategory?.success) return [];
    return getCategory.data.map(cat => ({ 
      label: cat.name, 
      value: cat._id 
    }));
  }, [getCategory]);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(FORM_SCHEMA),
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

  // Load product data into form
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

      // Set media
      if (product.media?.length > 0) {
        const media = product.media.map(item => ({
          _id: item._id,
          url: item.secure_url,
        }));
        setSelectedMedia(media);
      }
    }
  }, [getProduct, id, form]);

  // Auto-generate slug from name
  const nameValue = form.watch("name");
  useEffect(() => {
    if (nameValue) {
      const slug = slugify(nameValue, { 
        lower: true, 
        strict: true,
        trim: true 
      });
      form.setValue("slug", slug, { shouldValidate: true });
    }
  }, [nameValue, form]);

  // Calculate discount percentage
  const mrpValue = form.watch("mrp");
  const sellingPriceValue = form.watch("sellingPrice");
  useEffect(() => {
    const mrp = parseFloat(mrpValue) || 0;
    const sellingPrice = parseFloat(sellingPriceValue) || 0;

    if (mrp > 0 && sellingPrice > 0 && sellingPrice <= mrp) {
      const discount = ((mrp - sellingPrice) / mrp) * 100;
      form.setValue("discountPercentage", Math.round(discount));
    }
  }, [mrpValue, sellingPriceValue, form]);

  // Editor change handler
  const handleEditorChange = useCallback((event, editor) => {
    form.setValue("description", editor.getData(), { shouldValidate: true });
  }, [form]);

  // Form submission
  const onSubmit = async (values) => {
    if (selectedMedia.length === 0) {
      showToast("error", "Please select at least one media file.");
      return;
    }

    setLoading(true);
    try {
      const mediaIds = selectedMedia.map(media => media._id);
      const payload = { ...values, media: mediaIds };

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  // Error state
  if (productError || categoryError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-red-500 text-lg mb-4">Error loading data</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BreadCrumb breadCrumbData={BREADCRUMB_DATA} />
      
      <Card className="rounded-lg shadow-sm">
        <CardHeader className="pb-3 border-b">
          <h4 className="text-xl font-semibold">Edit Product</h4>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "name",
                    label: "Product Name",
                    placeholder: "Enter product name",
                    type: "text",
                    required: true
                  },
                  {
                    name: "slug",
                    label: "Slug",
                    placeholder: "Product slug (auto-generated)",
                    type: "text",
                    required: true
                  },
                  {
                    name: "category",
                    label: "Category",
                    component: "select",
                    required: true
                  },
                  {
                    name: "mrp",
                    label: "MRP",
                    placeholder: "Enter MRP",
                    type: "number",
                    required: true
                  },
                  {
                    name: "sellingPrice",
                    label: "Selling Price",
                    placeholder: "Enter selling price",
                    type: "number",
                    required: true
                  },
                  {
                    name: "discountPercentage",
                    label: "Discount Percentage",
                    placeholder: "Auto-calculated",
                    type: "number",
                    readOnly: true
                  }
                ].map((fieldConfig) => (
                  <FormField
                    key={fieldConfig.name}
                    control={form.control}
                    name={fieldConfig.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {fieldConfig.label}
                          {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
                        </FormLabel>
                        <FormControl>
                          {fieldConfig.component === "select" ? (
                            <Select
                              options={categoryOptions}
                              selected={field.value}
                              setSelected={field.onChange}
                              isMulti={false}
                              isLoading={categoryLoading}
                              disabled={loading}
                            />
                          ) : (
                            <Input
                              type={fieldConfig.type}
                              placeholder={fieldConfig.placeholder}
                              {...field}
                              onChange={(e) => {
                                if (fieldConfig.type === "number") {
                                  field.onChange(parseFloat(e.target.value) || 0);
                                } else {
                                  field.onChange(e.target.value);
                                }
                              }}
                              readOnly={fieldConfig.readOnly}
                              disabled={loading}
                              className={fieldConfig.readOnly ? "bg-gray-50" : ""}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Description Editor */}
              <FormField
                control={form.control}
                name="description"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      {!getProductLoading && (
                        <Editor
                          onChange={handleEditorChange}
                          initialData={form.getValues("description")}
                          disabled={loading}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Media Selection Section */}
              <div className="space-y-4">
                <div className="border border-dashed rounded-lg p-6 text-center">
                  <MediaModal
                    open={open}
                    setOpen={setOpen}
                    selectedMedia={selectedMedia}
                    setSelectedMedia={setSelectedMedia}
                    isMultiple={true}
                  />
                  
                  {/* Media Preview Grid */}
                  {selectedMedia.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap justify-center gap-4">
                        {selectedMedia.map(media => (
                          <div 
                            key={media._id} 
                            className="relative h-24 w-24 border rounded-lg overflow-hidden group"
                          >
                            <Image
                              src={media.url}
                              alt="Product media"
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        {selectedMedia.length} media file(s) selected
                      </div>
                    </div>
                  )}
                  
                  {/* Media Select Button */}
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    disabled={loading}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="font-medium">
                      {selectedMedia.length > 0 ? "Change Media" : "Select Media"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <ButtonLoading
                  loading={loading}
                  type="submit"
                  text="Save Changes"
                  className="min-w-[150px]"
                />
                <button
                  type="button"
                  onClick={() => router.push(ADMIN_PRODUCT_SHOW)}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
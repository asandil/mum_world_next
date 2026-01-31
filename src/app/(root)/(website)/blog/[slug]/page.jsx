import Author from "@/components/Author";
import SharePost from "@/components/SharePost";
import SignUp from "@/components/SignUp";
import Blogs from "@/lib/BlogsData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export const metadata = {
  title: "Motherhood & Wellness Blog | Pregnancy & Baby Care Insights | MumWorld",
  description: "Discover inspiring articles on pregnancy, parenting, baby nutrition, and wellness. Stay informed and supported throughout your motherhood journey on the MumWorld blog.",
  keywords: "pregnancy blog, parenting articles, motherhood blog, baby care tips",
}

// Server Component
const BlogPage = async ({ params }) => {
  const { slug } = params; // ✅ Works in server component

  // Find blog by slug
  const blog = Blogs.find((b) => b.slug === slug);

  if (!blog) return notFound(); // 404 if not found

  return (
    <section className="py-[40px] w-full lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
      <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
        MY BLOG
        <hr className="mt-[16px] border-[1px] border-black" />
      </h1>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar */}
        <div className="w-full lg:w-[34.2%] order-2 border-t-[1px] lg:border-t-0 pt-[1rem] lg:pt-[12px]">
          <SignUp />
        </div>

        {/* Blog Content */}
        <div className="w-full lg:w-full">
          <div className="w-full lg:border-r-[2px] border-[rgb(226,226,226)]">
            <article className="mt-[16px]">
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="px-[24px]">
                  {/* Back link */}
                  <Link
                    className="text-[#F69E87] text-[16px] font-[500] inline-flex mb-[40px] items-center gap-2 hover:text-[#e6846a]"
                    href="/test"
                  >
                    All Blogs
                  </Link>

                  <h1 className="font-[400] text-[28px] text-black mb-[8px] leading-[1.125]">
                    {blog.title}
                  </h1>

                  <p className="flex gap-3 justify-start text-[14px] leading-[1.5] font-400 text-[rgb(89,89,89)] mb-[32px]">
                    <span>{new Date(blog.date).toDateString()}</span>
                    <span>|</span>
                    <span>{blog.category}</span>
                  </p>

                  {/* Blog image */}
                  <figure className="mb-[24px] w-full max-w-[372px] md:max-w-[500px] flex flex-col mx-auto">
                    <div className="relative w-full h-[350px] overflow-hidden rounded-lg">
                      <Image
                        src={blog.image.url}
                        alt={blog.image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 400px, 400px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="text-[rgb(82,82,82)] px-[8px] py-[4px] bg-[rgb(246,246,246)] font-[400] text-center">
                      {blog.image.alt}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </article>

            {/* Blog content sections */}
            {blog.content?.map((section, idx) => (
              <div key={idx} className="mb-[12px]">
                <h3 className="text-[20px] font-[600] text-black mb-[8px]">
                  {section.heading}
                </h3>

                <h3 className="text-[18px] font-[600] text-black ">
                  {section.subheading}
                </h3>

                 <h3 className="text-[18px] font-[500] text-black">
                  {section.interheading}
                </h3>

                {Array.isArray(section.items) ? (
                  <ul className="list-disc pl-[20px] text-[16px] text-[rgb(89,89,89)] ">
                    {section.items.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                ) : (
                  <p
                    className="text-[16px] text-[rgb(89,89,89)] whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: section.items }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Author */}
          <div className="mt-[20px]">
            <Author />
          </div>

          {/* Share post */}
          <div className="mt-5">
            <SharePost />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;

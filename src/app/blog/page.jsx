
import BlogList from '@/components/blog/BlogList';
import Categories from '@/components/Categories';
import { getBlogPosts } from '@/lib/api/blog';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <h1
			className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black"
		>
			MY BLOG
			<hr className="mt-[16px] border-[1px] border-black" />
		</h1>
    <div class="flex flex-col lg:flex-row gap-5">
			<div
				class="w-[100%] lg:w-[25%] order-2 lg:px-[24px] border-t-[1px] lg:border-t-0 pt-[1.25rem] lg:pt-0"
			>
				{/* <!-- categories --> */}
				<Categories />
			</div>
			<div class="w-[100%] lg:w-[75%]">
				<div class="w-[100%] lg:border-r-[1px] border-[rgb(226,226,226)]">
					<BlogList posts={posts} />
				</div>
			</div>
		</div>
      
    </section>
  );
}

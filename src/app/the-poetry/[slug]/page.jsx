
import ArticlePost from '@/components/the-poetry/ArticlePost';
import { getBlogPost } from '@/lib/api/blog';
import { notFound } from 'next/navigation';

export default async function ArticlePostPage({ params }) {
  const post = await getBlogPost(params.slug);
  const { slug } = params;

  if (!post) {
    notFound();
  }

  return (
    <section className="py-[40px] w-[100%] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px]">
        <h1
          className="mb-[24px]
            leading-[1.4]
            tracking-[1px]
            text-[22px]
            font-[700]
            uppercase
            text-black"
        >
          Poetry of Pregnancy, New Born, Motherhood and Parenting
          <hr className="mt-[16px] border-[1px] border-black" />
        </h1>
        <div className="mb-[24px]">
          <img
            className="w-[100%]
                md:w-[50%]
                lg:w-[33%]"
            src="//img1.wsimg.com/isteam/ip/7d906beb-bc9b-4377-9b06-b22a3566899c/20230222_225058.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:400,h:400,cg:true"
            alt="The Poetry of Modern Pregnancy, Newborn Motherhood and parenting "
            sizes="(max-width: 600px) 100%, (max-width: 900px) 50vw, 33.3vw"
          />
        </div>
        <h2
          className="mb-[24px]
            leading-[1.4]
            tracking-[1px]
            text-[22px]
            font-[700]
            uppercase
            text-black"
        >
          Beautiful And Inspirational Poems For You
          <hr className="mt-[16px] border-[1px] border-black" />
        </h2>
        <p className="mb-[40px]">
          Keep reading to explore our collection of poems that you will surely
          enjoy. Bouts of love, suspense, and nervousness – you may experience a
          range of emotions, and these poems beautifully portray them all.
          Whether you’re looking for cheeky poems on pregnancy, newborns,
          motherhood or parenting, we have got you covered. <br />
          Here is our collection of some happy, sad, wacky and funny poems you
          would love to read.
        </p>
      <ArticlePost post={post} />
    </section>
  );
}
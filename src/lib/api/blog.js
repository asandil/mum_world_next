// lib/api/blog.js
export async function getBlogPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const posts = await res.json();

  console.log("first!!!!!!!", posts)
  
  // Add slugs to posts
  return posts.map(post => ({
    ...post,
    slug: post.title.toLowerCase().replace(/\s+/g, '-')
  }));
}

export async function getBlogPost(slug) {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug);
}

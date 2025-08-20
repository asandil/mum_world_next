export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
}

export function getRelated(category, posts) {
    // Filter blogs by the provided category
    const relatedBlogs = posts.filter(
        (post) =>
            post.data.category.toLowerCase() === category.toLowerCase() &&
            post.data.title !== title
    );

    // Return up to 5 related blogs (or all if less than 5)
    return relatedBlogs.slice(0, 5);
}

export function getAllTags(blogList) {
    const allTags = new Set();

    blogList.forEach(blog => {
        blog.data.tags.forEach(tag => allTags.add(tag));
    });
    const sortedTags = Array.from(allTags).sort();
    return Array.from(sortedTags);
}

export function generateCategoryData(blogList) {
    let categories = getAllTags(blogList)
    let categoryData = [];
    categories.forEach((category) => {
        categoryData.push({
            name: category,
            slug: `${slugify(category)}`,
        });
    });
    return categoryData;
}

export function getRecentPosts(blogs, title) {
    const recentBlogs = blogs.filter(
        (post) =>
            post.data.title !== title
    );
    recentBlogs.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
    return recentBlogs.slice(0, 3);
}

export function filterBlogsByTag(targetTag, blogs) {
    return blogs.filter(blog => blog.data.tags.includes(targetTag));
};

export function getLastPathSegment(url) {
    // Split the URL by '/'
    const segments = url.split('/');

    // Get the last segment
    const lastSegment = segments[segments.length - 1];

    return lastSegment;
}
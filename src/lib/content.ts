import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { remark } from "remark";
import html from "remark-html";

// Blog schema
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.string(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  tags: z.array(z.string()).optional(),
});

const blogDir = path.join(process.cwd(), "src/content/blog");

// Load all blog posts
export async function getBlogPosts() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  return await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      const parsed = blogSchema.parse(data);

      // ✅ Convert markdown → HTML
      const processed = await remark().use(html).process(content);
      const contentHtml = processed.toString();

      return {
        slug: filename.replace(/\.md$/, ""),
        frontmatter: parsed,
        contentHtml, // now you can render safely
      };
    })
  );
}


const poetrySchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.string(),
  image: z.object({
    url: z.string(),
    alt: z.string(),
  }),
  tags: z.array(z.string()).optional(),
});

const poetryDir = path.join(process.cwd(), "src/content/poetry");

// Load all poetry posts
export function getPoetryPosts() {
  const files = fs.readdirSync(poetryDir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const filePath = path.join(poetryDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);

    const parsed = poetrySchema.parse(data);

    return {
      slug: filename.replace(/\.md$/, ""),
      frontmatter: parsed,
      content,
    };
  });
}
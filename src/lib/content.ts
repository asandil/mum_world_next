import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

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
export function getBlogPosts() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);

    const parsed = blogSchema.parse(data); // ✅ type check

    return {
      slug: filename.replace(/\.md$/, ""), // 🔑 clean slug like "apple-cinnamon"
      frontmatter: parsed,
      content,
    };
  });
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
import getPostMetadata from "@/utils/getPostMetadata";
import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";

function getPostContent(slug: string) {
  const folder = "blogs/";
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("blogs");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({ params, searchParams }: any) {
  const param = await params;
  const { data } = getPostContent(param.slug);

  return {
    title: data?.title
      ? `Techno Blog - ${data?.title}`
      : `Techno Blog - ${params.slug.replaceAll("_", " ")}`,
    description:
      data?.description || "Read insightful technology articles and tutorials.",
    keywords: data?.keywords || ["tech", "blog", "coding", "programming"],
    openGraph: {
      title: data?.title,
      description: data?.description,
      url: `https://yourdomain.com/blogs/${param.slug}`,
      type: "article",
    },
  };
}

const BlogPage = async (props: any) => {
  const param = await props.params;
  const slug = param.slug;
  const post = getPostContent(slug);

  return (
    <section className="container mx-auto py-6 px-4">
      <div className="markdown-content">
        <article>
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    </section>
  );
};

export default BlogPage;

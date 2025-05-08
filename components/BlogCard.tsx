import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  bio: string;
  prep_time: string;
  cook_time: string;
  [key: string]: any; // Allows for other potential properties
}

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <Link
      className="flex flex-col border-1 border-gray-200 p-4 rounded-xl w-full lg:w-[600px] hover:border-amber-500 hover:scale-105 duration-300"
      href={`/blog/${post.slug}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p className="text-md text-gray-700 line-clamp-2">{post.bio}</p>
        <div className="flex flex-row justify-between">
          <h5 className="text-sm">Reading time</h5>
          <p className="text-xs font-light text-gray-600">{post.prep_time}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

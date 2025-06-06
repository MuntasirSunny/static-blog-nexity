import BlogCard from "@/components/BlogCard";
import getPostMetadata from "@/utils/getPostMetadata";

export default function Home() {
  const postMetadata = getPostMetadata("blogs");

  return (
    <div className="flex flex-1 justify-center items-center mt-[20px]">
      <div className="flex flex-col items-center gap-2 lg:gap-5 mx-2 lg:mx-0">
        {postMetadata.map((post, index) => {
          return <BlogCard key={index} post={post} />;
        })}
      </div>
    </div>
  );
}

//import TestComponent from "@/components/TestComponent";
import BlogCard from "@/components/BlogCard";
import getPostMetadata from "@/utils/getPostMetadata";

export default function Home() {
  const postMetadata = getPostMetadata("blogs");

  return (
    <div className="container mx-auto h-screen flex flex-1 justify-center items-center">
      <div className="flex flex-col items-center gap-2 lg:gap-5 mx-2 lg:mx-0">
        {postMetadata.map((post, index) => {
          return <BlogCard key={index} post={post} />;
        })}
        {/* <TestComponent /> */}
      </div>
    </div>
  );
}

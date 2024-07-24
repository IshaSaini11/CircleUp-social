import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const res = await makeRequest.get(`/posts?userId=${userId}`);
      console.log('Fetched posts data:', res.data); // Add this line for debugging
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching posts:", error);
    return <div>Something went wrong!</div>;
  }

  return (
    <div className="posts">
      {data && data.length > 0 ? (
        data.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
};

export default Posts;
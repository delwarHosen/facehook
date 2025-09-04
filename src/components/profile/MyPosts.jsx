import { useProfile } from "../../hooks/useProfile"
import PostList from "../posts/PostList";

const MyPosts = () => {
    const { state } = useProfile();
    const posts = state?.posts;
    return (
        <div>
            <h1 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Post </h1>
            <PostList posts={posts}></PostList>
        </div>
    );
};

export default MyPosts;
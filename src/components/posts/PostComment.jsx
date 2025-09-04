
import { useState } from 'react';
import PostCommentList from './PostCommentList';
import useAxios from '../../hooks/useAxios';
import { useAuth } from '../../hooks/useAuth';
// import { useAvatar } from "../../hooks/useAvatar"

const PostComment = ({ post }) => {
    const { auth } = useAuth()
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState("")
    const api = useAxios();

    function toggleShowComment() {
        setShowComments(!showComments)
    }


    const addComment = async (event) => {
        if (event.keyCode === 13 && comment.trim() !== "") {
            try {
                const respons = await api.patch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
                    { comment } 
                );

                if (respons.status === 200) {
                    setComments([...respons.data.comments]);
                    setComment(""); 
                }
            } catch (error) {
                console.error("Failed to add comment:", error.response?.data || error.message);
            }
        }
    };


    return (
        <div>
            <div className="flex-center mb-3 gap-2 lg:gap-4">
                <img className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                    src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}}`} alt="avatar" />

                <div className="flex-1">
                    <input type="text"
                        className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
                        name="post"
                        id="post"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => addComment(e)}
                        placeholder="What's on your mind?" />
                </div>
            </div>

            <div className="mt-4 text-start">
                <button onClick={toggleShowComment} className="text-gray-300 max-md:text-sm">
                    All Comment ▾
                </button>
            </div>

            {showComments && <PostCommentList comments={comments} />}
        </div>
    );
};

export default PostComment;
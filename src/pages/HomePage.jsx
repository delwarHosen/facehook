import { useEffect} from 'react';
import useAxios from "../hooks/useAxios";
import PostList from "../components/posts/PostList"
import { actions } from '../actions';
import { usePost } from '../hooks/usePost';
import NewPost from '../components/posts/NewPost';

const HomePage = () => {
    const {state,dispatch}= usePost()
    const api = useAxios();

    useEffect(() => {
        dispatch({ type: actions.post.DATA_FETCHING });

        const fetchPost = async () => {
            try {
                const respons = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`);



                if (respons.status === 200) {
                    // dispatch({ type: actions.post.DATA_EDITED, data: respons.data });
                    dispatch({ type: actions.post.DATA_FETCHED, data: respons.data })
                }
            } catch (error) {
                console.error(error);
                dispatch({ type: actions.post.DATA_FETCHED_ERROR, error: error.message })
            }
        }

        fetchPost()
    }, [])


    if (state?.loading) {
        return <div>we are working</div>
    }

    if (state?.error) {
        return <div>Error inFatching post {state?.error?.message}</div>
    }

    return (
        <div>
            <NewPost/>
            <PostList posts={state?.posts} />
        </div>
    );
};

export default HomePage;
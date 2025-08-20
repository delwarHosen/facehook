import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const api = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        setLoading(true);
        const fetchProfile = async () => {
            try {
                const respons = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`)
                setUser(respons?.data?.user);
                setPosts(respons?.data?.posts)
            } catch (error) {
                console.log(error);
                setError(error)
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [auth?.user?.id])

    if (loading) {
        return <p>Fatching profile data .....</p>
    }

    return (
        <div>
            <p>{user?.firstName}{" "}{user?.lastName}</p>
            <p>You have {posts.length} Posts</p>
        </div>
    );
};

export default ProfilePage;
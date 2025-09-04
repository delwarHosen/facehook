import { useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { actions } from '../actions';
import ProfileInfo from '../components/profile/ProfileInfo';
import MyPosts from '../components/profile/MyPosts';

const ProfilePage = () => {
    const {state, dispatch} = useProfile();
    const api = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING })
        const fetchProfile = async () => {
            try {
                const respons = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`)
                if (respons.status === 200) {
                    dispatch({ type: actions.profile.DATA_FETCHED, data: respons.data })
                }
            } catch (error) {
                // console.log(error);
                dispatch({ type: actions.profile.DATA_FETCHED_ERROR, error: error.message })
            }
        }
        fetchProfile();
    }, [auth?.user?.id])

    if (state?.loading) {
        return <p>Fatching profile data .....</p>
    }

    return (
        // <div>
        //     <p>{state?.user?.firstName}{" "}{state.user?.lastName}</p>
        //     <p>You have {state?.posts.length} Posts</p>
        // </div>
        <>
        <ProfileInfo></ProfileInfo>
        <MyPosts/>
        </>
    );
};

export default ProfilePage;
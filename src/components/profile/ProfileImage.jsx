import { useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile"
import EditIcon from "../../assets/icons/edit.svg"
import { actions } from "../../actions";

const ProfileImage = () => {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const fileUploadRef = useRef();

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.addEventListener("change", handleImageDisplay)
        fileUploadRef.current.click()
    }


    const handleImageDisplay = async () => {

        try {

            const formData = new FormData();

            for (const file of fileUploadRef.current.files) {
                formData.append("avatar", file);
            }

            const respons = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}/avatar`, formData);

            if (respons.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: respons.data
                })
            }


        } catch (err) {
           dispatch({
            type: actions.profile.DATA_FETCHED_ERROR,
            error: err.message
           })
        }


    }

    return (
        <div className="relative mb-24 max-h-[180px] max-w-[180px] rounded-full w-24 h-24 lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img className="max-w-full rounde-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
                alt="profile image" />

            <form action="" className="">
                <button onClick={handleImageUpload} className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80" type="button">
                    <img src={EditIcon} alt="edit icon" />
                </button>
                <input type="file" name="" id="file" ref={fileUploadRef} hidden />
            </form>
        </div>
    );
};

export default ProfileImage;
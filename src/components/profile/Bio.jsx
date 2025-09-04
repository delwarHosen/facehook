import { useProfile } from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg"
import chechIcon from "../../assets/icons/check.png"
import { actions } from "../../actions";

import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const Bio = () => {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();

    const [bio, setBio] = useState(state?.user?.bio);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        setBio(state?.user?.bio || "");
    }, [state?.user?.bio]);

    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING })
        try {
            const respons = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`, { bio });

            if (respons.status === 200) {
                dispatch({ type: actions.profile.USER_DATA_EDITED, data: respons.data })
            }
            setEditMode(false)

        } catch (err) {
            dispatch({ type: actions.profile.DATA_FETCHED_ERROR, error: err.message })
        }
    }



    return (
        <div className="flex items-start gap-2 mt-4 lg:mt-6">
            <div className="flex-1">
                {!editMode ? (
                    <p className="leading-[180%] text-gray-400 lg:text-lg">
                        {state?.user?.bio}
                    </p>
                ) : (
                    <textarea
                        className="leading-[180%] text-gray-400 lg:text-lg p-2"
                        value={bio}
                        rows={4}
                        cols={55}
                        onChange={(e) => setBio(e.target.value)}
                    />
                )}
            </div>

            {
                !editMode ? (
                    <button className="flex-center h-7 w-7 rounded-full"
                        onClick={() => setEditMode(true)}
                    >
                        <img src={EditIcon} alt="Edit" />
                    </button>
                ) : (
                    <button className="flex-center h-7 w-7 rounded-full"
                        onClick={handleBioEdit}
                    >
                        Save<img src={chechIcon} alt="Edit" />
                    </button>
                )
            }
        </div>
    )
};

export default Bio;
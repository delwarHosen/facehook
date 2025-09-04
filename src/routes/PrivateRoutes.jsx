import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header"
import ProfileProvider from "../Provider/ProfileProvider";
import PostProvider from "../Provider/PostProvider";
const PrivateRoutes = () => {
    const { auth } = useAuth();
    return (
        <div>
            {
                auth.authToken ? (
                    <>
                        <PostProvider>
                            <ProfileProvider>
                                <Header></Header>
                                <main className="mx-auto mx-w-[1024px] py-8">
                                    <div className="container">
                                        <Outlet></Outlet>
                                    </div>
                                </main>
                            </ProfileProvider>
                        </PostProvider>
                    </>
                ) : (
                    <Navigate to="/login" />
                )
            }
        </div>
    );
};

export default PrivateRoutes;
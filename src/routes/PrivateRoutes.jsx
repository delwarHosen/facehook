import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header"
const PrivateRoutes = () => {
    const { auth } = useAuth();
    return (
        <div>
            {
                auth.user ? (
                    <>
                        <Header></Header>
                        <main className="mx-auto mx-w-[1024px] py-8">
                            <div className="container">
                                <Outlet></Outlet>
                            </div>
                        </main>
                    </>
                ) : (
                    <Navigate to="/login" />
                )
            }
        </div>
    );
};

export default PrivateRoutes;
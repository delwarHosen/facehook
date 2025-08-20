import { Link } from "react-router-dom";
import homeIcon from '../../assets/icons/home.svg'
import notification from '../../assets/icons/notification.svg'
import logo from "../../assets/images/logo.svg"
import avater from '../../assets/images/avatars/avatar_1.png'
import Logout from "../auth/Logout";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {

    const { auth } = useAuth();

    return (
        <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
            <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">

                <Link to="/">
                    <img className="max-w-[100px] rounded-full lg:max-w-[130px]" src={logo} />
                </Link>


                <div className="flex items-center space-x-4">
                    <Link to="/" className="btn-primary">
                        <img src={homeIcon} alt="Home" />
                        Home
                    </Link>
                    <button className="icon-btn">
                        <img src={notification} alt="Notification" />
                    </button>

                    <Logout></Logout>
                    <Link className="flex-center !ml-8 gap-3">
                        <span className="text-lg font-medium lg:text-xl">{auth?.user?.firstName}</span>
                        <img className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
                            src={avater} alt="" />
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Header;
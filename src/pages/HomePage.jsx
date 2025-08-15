
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { auth } = useAuth();
    console.log(auth);
    return (
        <div>
            <h1>This is Home</h1>
            <Link to="/me"> go to Profile</Link>
        </div>
    );
};

export default HomePage;
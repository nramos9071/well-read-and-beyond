import { useQuery } from '@apollo/client';

import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const Home = () => {
    

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Welcome to the Home Page</h1>
            </div>

            <Footer />
        </div>
    )


};

export default Home;
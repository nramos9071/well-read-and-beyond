import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { GET_ME } from '../utils/mutations';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

// Profile Component
const Profile = () => {
    const [books, setBooks] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Extract userId from the token stored in cookies
        const token = Cookies.get('id_token');
        if (token) {
            const decoded = jwtDecode(token); // Decode the token to extract userId
            setUserId(decoded._id);  // Get userId from decoded token
        }
    }, []);

    // Use Apollo's `useQuery` hook to fetch the user's data
    const { loading, error, data } = useQuery(GET_ME);

    useEffect(() => {
        if (data) {
            // Log the data to inspect the response structure
            console.log('Fetched data:', data);
            console.log('Saved Books:', data?.me?.savedBooks);
            setBooks(data?.me?.savedBooks || []); // Set books state
        }
    }, [data]); // Runs whenever the `data` changes


    return (
        <div id="profile1">
  
            <div className="heading justify-center">
                {/* <h2>Profile Page</h2> */}
            </div>
            <div className="avatar" id="profileAvatar">
                <div className="rounded-full size-60">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className="userBio place-items-center">
                <p className="usernameP text-lg rounded">@well_reader_2024</p>
                <p className="bioPara rounded">I love to read, but sometimes I want a story that's off the page! That's why I made a profile on WR&B.</p>
            </div>
            <div id="userContent">
                <div className="flex w-full flex-col">
                    <div id="profileCards" className="card bg-base-300 rounded-box grid h-50 place-items-left">
                        <h3 className="profileH3">Book List</h3>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        {books.length > 0 ? (
                            <div className="card-grid" id="bookCard">
                                {books.map((data) => (
                                    <div key={data.id} className="card book-card rounded bg-base-100 min-w-30 w-56 h-96 p-2 shadow-xl size-40">
                                        {/* Check if book.image is available */}
                                        <img src={data.image || 'default-image-url.jpg'} alt={data.title} />
                                        <h4 className="card-title justify-center" id="profileBookCardTitle">{data.title}</h4>
                                        <p className="card-body justify-center" id="profileBookCardBody">{data.authors?.join(', ')}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No saved books found.</p>
                        )}
                    </div>
                    {/* <div className="divider"></div>
                    <div id="profileCards1" className="card bg-base-300 rounded-box grid h-20 place-items-left">
                        <h3 className="profileH3">Movie List</h3>
                        <p>Did you see a suggested movie you might like? Save it to your profile to watch later!</p>

                    </div> */}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};
export default Profile;
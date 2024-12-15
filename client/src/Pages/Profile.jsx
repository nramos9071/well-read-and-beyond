import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { GET_ME } from '../utils/mutations';

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
                <p>username</p>
                <p className="bioPara">user bio here</p>
            </div>
            <div id="userContent">
                <div className="flex w-full flex-col">
                    <div id="profileCards" className="card bg-base-300 rounded-box grid h-20 place-items-left">
                        <h3 className="profileH3">Book List</h3>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        {books.length > 0 ? (
                            <div className="card-grid" id="BookCard">
                                {books.map((data) => (
                                    <div key={data.id} className="book-card">
                                        {/* Check if book.image is available */}
                                        <img src={book.image || 'default-image-url.jpg'} alt={book.title} />
                                        <h4>{book.title}</h4>
                                        <p>Authors: {book.authors?.join(', ')}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No saved books found.</p>
                        )}
                    </div>
                    <div className="divider"></div>
                    <div id="profileCards1" className="card bg-base-300 rounded-box grid h-20 place-items-left">
                        <h3 className="profileH3">Movie List</h3>
                        <p>movie images here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
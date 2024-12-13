// Profile.js (React Component)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';

const Profile = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Extract userId from the token stored in localStorage (or wherever you're storing it)
        const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage
        if (token) {
            const decodedToken = jwt_decode(token); // Use the correct `decode` function here
            setUserId(decodedToken._id);  // Get userId from decoded token
        }
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`/user/${userId}/saved-books`);
                // Safeguard: ensure books is always an array, even if API returns null or undefined
                const booksData = response.data.items || []; // If items is undefined or null, set an empty array

                setBooks(booksData); // Set the books state
            } catch (error) {
                console.error('Error fetching saved books', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchBooks(); // Only fetch books if userId is available
        }
    }, [userId]);

    return (
        <div id="profile1">
            <div className="heading justify-center">
                {/* <h2>Profile Page</h2> */}
            </div>
            <div className="avatar" id="profileAvatar">
                <div className=" rounded-full size-60">
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
                        {/* book images */}

                        {(
                            <div>
                                {books.length > 0 ? (
                                    <ul>
                                        {books.map((book, index) => (
                                            <li key={index}>
                                                <strong>{book.volumeInfo.title}</strong>
                                                <p>{book.volumeInfo.authors?.join(', ')}</p>
                                                <p>{book.volumeInfo.publishedDate}</p>
                                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No saved books found.</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="divider"></div>
                    <div id="profileCards1" className="card bg-base-300 rounded-box grid h-20 place-items-left">
                        <h3 className="profileH3">Movie List</h3>
                        {/* movie images */}
                        <p>movie images here</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
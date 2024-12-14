// Profile.js (React Component)
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie'
import BookCard from '../components/bookCard'



const GET_ME = gql`
  query me {
    me {
      id
      email
      savedBooks {
        id
        volumeInfo {
          title
          authors
          publishedDate
          imageLinks {
            thumbnail
          }
          description
        }
      }
    }
  }
`;



const Profile = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Extract userId from the token stored in cookies
        const token = Cookies.get('id_token'); // Assuming the token is saved in cookies
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
                <h2>Profile Page</h2>
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
                        <p>book images here</p>
                        {(
                            <div>
                                <h2>Saved Books</h2>
                                {books.length > 0 ? (
                                    <div className="card-grid" id="BookCard">
                                        {books.map((book, index) => (
                                        <BookCard key={index} book={book} />
                                        ))}
                                    </div>
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
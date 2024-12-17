import React from "react";
import '../index.css';

function MovieCard( { title, image, releaseDate }) {
    return (
        <div id="movieCard" className="card card-side bg-base-100 shadow-xl rounded size-44 flex-auto">
            <figure>
                <img
                    src={image || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"} // Fallback image in case no poster is found
                    alt={title || "Movie"} // Fallback text for alt tag
                />
            </figure>
            <div className="card-body homeMovieCardBody">
                {/* Dynamically render the movie title */}
                <h2 className="card-title homeMovieCardTitle">{title || "Movie Title"}</h2>
                <p>Release Date: {releaseDate || "Unknown"}</p> {/* Optional release date */}
                <div className="card-actions movieCardActions">
                    <button className="btn movieButton btn-primary">Add to List</button>
                </div>
            </div>
        </div>
    );
   
  
}

export default MovieCard;

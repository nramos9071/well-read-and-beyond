import React, { useState } from "react";
import '../App.css';


function BookCard({ data }) {
    console.log(data);
    return (
        <div className="card card-side  bg-base-100 shadow-xl flex flex-row w-full max-w-md">
            {data?.items?.map((book, index) => (
                <div key={index} className="flex flex-row w-full">
                    <figure className="flex-shrink-0 mr-4">
                        <img 
                            className="w-24 h-36 object-cover" 
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title} />
                    </figure>
                    <div className="card-body flex flex-col justify-between">
                        <h2 className="text-xl font-semibold">{book.title}</h2>
                        <p className="text-sm text-gray-600">{book.volumeInfo.description ? book.volumeInfo.description : 'No description available.'}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookCard;

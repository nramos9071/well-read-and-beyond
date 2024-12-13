import React, { useState } from "react";


function BookCard({data}) {
    // const [show,setShow]=useState(false);
    // const [bookItem,setItem]=useState();
    console.log(data);
    return (
      <div>

        <div id="bookCard" className="card card-side bg-base-100 shadow-xl size-40">
        <div>
                <ul>
                    {data?.items?.map((book, index) => (
                       
                        <li key={index}>
                            <figure>
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                            </figure>
                            <div className="card-body"></div>
                            <h2 className="card-actions justify-end">{book.title}</h2>
                            <h3>{book.id}</h3>
                            <div className="card-actions justify-end">
                    <button className="btn btn-primary">View</button>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
            
            </div>
        </div>
      
    );
}

export default BookCard;

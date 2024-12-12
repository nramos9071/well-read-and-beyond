import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { searchBooks } from '../utils/API';


const  BookSearch = () => {
    const [query] = useState("");
    const [book, setBook] = useState("");
    const [data, setData] = useState([]);
    
    function handleChange(event) {  
        const book = event.target.value;  
        setBook(book);  
    }

    const googleBooksSearch = (event) => {
        if (event.key === "Enter") {
            searchBooks(query)
            .then(data => {
                console.log(data.data.items);
                setData(data.data.items);
            }).catch(error => {
                console.error("Error fetching data: ", error);
            });
        }
    };
    return (
        <div>
            <form onKeyDown={googleBooksSearch}
            className="input input-bordered flex items-center gap-2 color-white">
                <input onChange = {handleChange} type="text" className="grow" 
                placeholder="Search" value={query}
                    style={{ color: "white" }}
                    /> 
                <button onClick={googleBooksSearch}
                    className="badge badge-info"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#fcfcfc", }} /></button>
            </form>
        </div>
    );
}
export default BookSearch;
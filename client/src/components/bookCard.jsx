function bookCard() {
    return (
        <div id="bookCard" className="card card-side bg-base-100 shadow-xl size-40">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="Books" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Title of Book</h2>
                {/* <p>Click the button to learn about this book.</p> */}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">View</button>
                </div>
            </div>
        </div>
    );
}

export default bookCard;

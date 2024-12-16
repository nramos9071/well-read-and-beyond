function MovieCard() {
    return (
        <div id="movieCard" className="card card-side bg-base-100 shadow-xl rounded size-44 flex-auto">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    alt="Movie" />
            </figure>
            <div className="card-body homeMovieCardBody">
                <h2 className="card-title homeMovieCardTitle">Title of Movie</h2>
                <div className="card-actions movieCardActions">
                    <button className="btn movieButton btn-primary">Add to List</button>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;

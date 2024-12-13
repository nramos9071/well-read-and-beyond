import React from 'react';

// import movieCard from '../components/movieCard';


// import bookCard from '../components/bookCard';

const Profile = () => {

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
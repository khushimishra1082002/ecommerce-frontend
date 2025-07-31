import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const IsLoggedIn = () => {

  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
     <div className="flex justify-center items-center h-screen">
     <div className="bg-white grid grid-cols-1 md:grid-cols-2 w-full h-full  ">
        
        <div className="w-full h-full object-cover">
          <img className="w-full h-full object-cover"
          src="https://wallpapers.com/images/hd/e-commerce-1920-x-1080-wallpaper-tb4uqckgoo0883zw.jpg" />
        </div>
        <div className="h-full flex items-center w-full">
           {showSignUp ? (
            <SignUp setShowSignUp={setShowSignUp} />
          ) : (
            <Login setShowSignUp={setShowSignUp} />
          )}
        </div>
      </div>
     </div>
    </>
  );
};

export default IsLoggedIn;

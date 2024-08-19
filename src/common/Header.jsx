import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/action";
import Cookies from "js-cookie";
import { useState } from "react";
import { IoLogOutSharp } from "react-icons/io5";
function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.session);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-[#03045e] to-[#0077b6] h-[7vh]">
        <div className="flex items-center justify-center flex-grow text-white">
          <Link to={isLoggedIn ? "/dashboard" : "/"}>
            <span className="font-semibold text-xl tracking-tight">
              🏪 Janta Store{" "}
              <b style={{ color: "#caf0f8", padding: "4px" }}>आपका</b> Store
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white text-xl bold m-2">{username}</p>
          {isLoggedIn && (
            <div className="relative group">
              <button
                className="text-2xl hover:bg-red-800 text-white hover:text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={logoutHandler}
              >
                <IoLogOutSharp />
              </button>
              <span className="absolute left-0 p-1 mt-2 bg-gray-500 text-white text-sm rounded hidden group-hover:block">
                Logout
              </span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;

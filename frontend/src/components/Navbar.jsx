import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../App';

export default function Navbar() {
    const {token, setToken} = useContext(DataContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                setToken("");
                navigate('/')
            }
        } catch (err) {
            console.log("error", err)
        }
    }
  return (
    <div>
        {token ? (
            <nav className="bg-gray-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
              {/* Logo */}
              <div className="text-white text-xl font-bold">
                <a href="/">MyWebsite</a>
              </div>
      
              {/* Menu */}
              <ul className="flex space-x-8 text-white">
                <li>
                  <Link to={`/${token}`} className="hover:text-gray-300">Home</Link>
                </li>
                <li>
                  <Link to={`/admin/${token}`} className="hover:text-gray-300">Admin</Link>
                </li>
                <li>
                  <Link onClick={logout} className="hover:text-red-300">Logout</Link>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
            <nav className="bg-gray-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
              {/* Logo */}
              <div className="text-white text-xl font-bold">
                <a href="/">MyWebsite</a>
              </div>
      
              {/* Menu */}
              <ul className="flex space-x-8 text-white">
                <li>
                  <Link to="/" className="hover:text-gray-300">Home</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-300">Register</Link>
                </li>
                {/* <li>
                  <Link to="/login" className="hover:text-gray-300">Login</Link>
                </li> */}
              </ul>
            </div>
          </nav>
        )}
    </div>
  );
}

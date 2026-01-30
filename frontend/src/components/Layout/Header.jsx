import React from 'react';
import useAuth from '../../hooks/useAuth';
import '../../styles/auth.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Task Manager</h1>
        </div>
        {user && (
          <div className="header-user">
            <span className="header-username">Welcome, {user.name}</span>
            <button onClick={logout} className="btn btn-logout">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

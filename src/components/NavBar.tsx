import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { MODULES } from '../pages/modules';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          會計系統
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                首頁
              </NavLink>
            </li>
            {MODULES.map((module) => (
              <li className="nav-item" key={module.key}>
                <NavLink className="nav-link" to={module.path}>
                  {module.title}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink className="nav-link" to="/journal">
                分錄
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/accounts">
                會計科目
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/trial-balance">
                試算表
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

function Header(): React.JSX.Element {
  const isActiveClass = (isActive: boolean): string => {
    return clsx('c-pourqoi__header-link', {
      'is-active': isActive,
    });
  };

  return (
    <header className="c-pourqoi__header">
      <div className="c-pourqoi__header-logo">
        <Logo className="c-pourqoi__header-logo-image" />
      </div>
      <nav className="c-pourqoi__header-navigation">
        <ul className="c-pourqoi__header-list">
          <li className="c-pourqoi__header-list-el">
            <NavLink to="/" className={({ isActive }) => isActiveClass(isActive)}>
              Home
            </NavLink>
          </li>
          <li className="c-pourqoi__header-list-el">
            <NavLink to="/edit" className={({ isActive }) => isActiveClass(isActive)}>
              Edit Ingredients
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Social from './Social'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faBars,
    faTimes
} from '@fortawesome/free-solid-svg-icons'

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => setShowMenu(!showMenu)
    return (
        <div className="top-menu">
            <FontAwesomeIcon className='hamburger-menu' icon={faBars}
                onClick={toggleMenu}
            />
            <div className={`menu-links ${showMenu ? '' : 'hidden'}`}>
                <FontAwesomeIcon className='menu-close-icon' icon={faTimes} onClick={toggleMenu} />
                <Link onClick={toggleMenu} to="/">Projects</Link>
                <Link onClick={toggleMenu} to="/about">About</Link>
                <a onClick={toggleMenu} target="_blank" rel="noopener noreferrer" href="https://airtable.com/shrMCZrvP7467LNG7">
                    Feedback
                </a>

                <Social />
            </div>

        </div>
    )
}

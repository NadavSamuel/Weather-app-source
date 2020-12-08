import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleDegreeType } from '../actions/weatherActions'
import { AnimatePresence, motion } from 'framer-motion'
import {useOnClickOutside} from '../services/customHooks'

export function Navbar() {
    const dispatch = useDispatch()
    const [btnMode, toggleBtnMode] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const elModal = useRef()
    useOnClickOutside(elModal, () => setIsShowModal(false));

    function onToggleDegreeType() {
        toggleBtnMode(!btnMode)
        dispatch(toggleDegreeType());
    }
    const modalShowClass = () =>isShowModal ? '':'hide'
    return (
        <nav>
            <div className="links-container">
                <div className="routing-links">
                <Link className='btn' to='/'>Home</Link>
                <Link className='btn' to='/favorites'>Favorites  </Link>
                <Link className='btn' to='/about'>About  </Link>
                </div>
                <span onClick={() => setIsShowModal(true)} className={'cursor-pointer'}>Preference</span>
                     <div ref={elModal}  className={`preference-modal ${modalShowClass()}`} >
                        <span>Cel</span>
                        <label className={`switch ${modalShowClass()}`}>
                            <input className={modalShowClass()} type="checkbox" checked={btnMode} onChange={onToggleDegreeType} />
                            <div></div>
                        </label>
                        <span>Far</span>
                    </div>
            </div>

        </nav>
    );
}


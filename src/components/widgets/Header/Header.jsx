import React from 'react';
import {Link} from "react-router-dom";

import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={styles.Header}>
            <div className={"container mx-auto p-4 flex gap-4"}>
                <Link to={"/"} className={"font-bold text-white hover:text-blue"}>useInput</Link>
                <Link to={"/hover"} className={"font-bold text-white hover:text-blue"}>useHover</Link>
                <Link to={"/list"} className={"font-bold text-white hover:text-blue"}>useScroll</Link>
                <Link to={"/search"} className={"font-bold text-white hover:text-blue"}>useDebounce</Link>
                <Link to={"/request"} className={"font-bold text-white hover:text-blue"}>useRequest</Link>
                <Link to={"/throttle"} className={"font-bold text-white hover:text-blue"}>useThrottle</Link>
            </div>
        </div>
    );
};

export default Header;

import React from 'react';
import {Link, useLocation} from "react-router-dom";

import styles from './Header.module.scss';

const hooks = [
    {
        to: "/",
        title: "useInput"
    },
    {
        to: "/hover",
        title: "useHover"
    },
    {
        to: "/list",
        title: "useScroll"
    },
    {
        to: "/search",
        title: "useDebounce"
    },
    {
        to: "/request",
        title: "useRequest"
    },
    {
        to: "/throttle",
        title: "useThrottle"
    },
    {
        to: "/mask-input",
        title: "useMaskInput"
    },
    {
        to: "/lazy-images",
        title: "useLazyImage"
    },
    {
        to: "/autoplay-video",
        title: "useVideo"
    },
    {
        to: "/menu",
        title: "useMenu"
    },
    {
        to: "/responsive",
        title: "useMatchMedia"
    },
    {
        to: "/mutation-observer",
        title: "useMutationObserver"
    }
];
const utils = [
    {
        to: "/convert-file",
        title: "File to base64"
    },
    {
        to: "/verification-code",
        title: "Input verification code"
    },
];

const Header = () => {
    const location = useLocation();

    return (
        <div className={styles.Header}>
            <div className={"container mx-auto flex gap-4"}>
                <div className={styles.dropdown}>
                    <div className={"font-bold text-white hover:text-blue p-4"}>User hooks</div>
                    <div className={styles.dropdown__content}>
                        {
                            hooks.map(hook =>
                                <Link key={hook.to} to={hook.to} className={location.pathname === hook.to ? "!text-purple" : ""}>
                                    {hook.title}
                                </Link>)
                        }
                    </div>
                </div>
                <div className={styles.dropdown}>
                    <div className={"font-bold text-white hover:text-blue p-4"}>Utils</div>
                    <div className={styles.dropdown__content}>
                        {
                            utils.map(util =>
                                <Link key={util.to} to={util.to} className={location.pathname === util.to ? "!text-purple" : ""}>
                                    {util.title}
                                </Link>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

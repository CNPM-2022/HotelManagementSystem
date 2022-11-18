import { useState } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';
import './ScrollToTop.scss';

function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
            /* you can also use 'auto' behaviour
         in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button id="scrollUp" onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }}>
            <RiArrowUpSLine />
        </button>
    );
}

export default ScrollToTop;

import './GlobalStyles.scss';
import 'aos/dist/aos.css';
import Aos from 'aos';

Aos.init({
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 40, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
});

function GlobalStyles({ children }) {
    return children;
}

export default GlobalStyles;

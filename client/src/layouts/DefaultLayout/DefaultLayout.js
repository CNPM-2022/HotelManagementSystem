import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="default-layout-container">
            <Header />
            <div className="content-container">{children}</div>
            <Footer />
            <ScrollToTop />
        </div>
    );
}

export default DefaultLayout;

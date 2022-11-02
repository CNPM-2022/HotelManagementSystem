import Navbar from '../components/Navbar/Navbar';
import Nav from '../components/Navbar/Nav';
import Footer from '../components/Footer/Footer';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="default-layout-container">
            <Navbar />
            <Nav />
            <div className="content-container">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

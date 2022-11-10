import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="default-layout-container">
            <Header />
            <div className="content-container">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

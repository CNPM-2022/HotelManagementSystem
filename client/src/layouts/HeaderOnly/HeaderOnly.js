import Header from '../components/Header/Header';
import './HeaderOnly.scss';

function HeaderOnly({ children }) {
    return (
        <div className="header-only-container">
            <Header />
            <div className="content-container">{children}</div>
        </div>
    );
}

export default HeaderOnly;

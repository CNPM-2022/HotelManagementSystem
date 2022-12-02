import Header from '../components/Header/Header';

function HeaderOnly({ children }) {
    return (
        <div className="layout-container">
            <Header />
            <div className="content-container">{children}</div>
        </div>
    );
}

export default HeaderOnly;

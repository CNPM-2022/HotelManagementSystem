import MainContent from './MainContent';
import TopContent from './TopContent';

function Header() {
    return (
        <header className="header-container">
            <TopContent />
            <MainContent />
        </header>
    );
}

export default Header;

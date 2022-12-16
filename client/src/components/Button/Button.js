import { Link } from 'react-router-dom';
import './Button.scss';

function Button({ className, to, onClick, children, primary }) {
    let classes = `btn-wrapper`;

    if (primary) classes += ' btn-primary';
    if (className) classes += ` ${className}`;

    let Comp = 'button';
    if (to) {
        Comp = Link;
    }

    return (
        <Comp to={to} className={classes} onClick={onClick}>
            {children}
        </Comp>
    );
}

export default Button;

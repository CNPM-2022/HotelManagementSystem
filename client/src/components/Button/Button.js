import './Button.scss';

function Button({ className, onClick, children, primary }) {
    let classes = `btn-wrapper`;

    if (primary) classes += ' btn-primary';
    if (className) classes += ` ${className}`;

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;

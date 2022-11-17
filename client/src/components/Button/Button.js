import './Button.scss';

function Button({ className, onClick, children }) {
    const classes = `btn-wrapper ${className}`;

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;

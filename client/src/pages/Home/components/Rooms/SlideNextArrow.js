import { BsArrowRight } from 'react-icons/bs';

function SlideNextArrow({ className, onClick }) {
    return (
        <button className={className} onClick={onClick}>
            Sau
            <BsArrowRight />
        </button>
    );
}

export default SlideNextArrow;

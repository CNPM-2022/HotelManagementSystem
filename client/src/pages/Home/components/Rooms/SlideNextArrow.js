import { BsArrowRight } from 'react-icons/bs';

function SlideNextArrow({ className, onClick }) {
    return (
        <button className={className} onClick={onClick}>
            Next
            <BsArrowRight />
        </button>
    );
}

export default SlideNextArrow;

import { BsArrowLeft } from 'react-icons/bs';

function SlidePrevArrow({ className, onClick }) {
    return (
        <button className={className} onClick={onClick}>
            <BsArrowLeft />
            Previous
        </button>
    );
}

export default SlidePrevArrow;

function SlidePrevArrow({ className, onClick, imageSrc }) {
    return (
        <div className={className} onClick={onClick}>
            <img src={imageSrc} alt="prev-slide" />
        </div>
    );
}

export default SlidePrevArrow;

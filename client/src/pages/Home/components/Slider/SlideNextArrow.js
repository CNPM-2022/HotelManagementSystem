function SlideNextArrow({ className, onClick, imageSrc }) {
    return (
        <div className={className} onClick={onClick}>
            <img src={imageSrc} alt="next-slide" />
        </div>
    );
}

export default SlideNextArrow;

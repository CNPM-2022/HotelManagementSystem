function FormatPrice({ children }) {
    const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return <>{formatPrice(children)}</>;
}

export default FormatPrice;

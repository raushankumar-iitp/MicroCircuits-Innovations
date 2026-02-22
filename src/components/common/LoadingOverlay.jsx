import InfiniteLogoPreloader from './InfiniteLogoPreloader';

const LoadingOverlay = ({ isVisible, message }) => {
    if (!isVisible) return null;
    return <InfiniteLogoPreloader message={message || "Loading..."} />;
};

export default LoadingOverlay;

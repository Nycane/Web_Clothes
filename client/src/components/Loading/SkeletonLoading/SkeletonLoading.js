import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function SkeletonLoading({ height, count, width, className, style }) {
    return height || count || width || className || style ? (
        <Skeleton height={height} width={width} style={style} count={count} className={className} />
    ) : (
        <Skeleton />
    );
}

export default SkeletonLoading;

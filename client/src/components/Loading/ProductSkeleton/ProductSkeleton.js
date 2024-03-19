import { memo, useEffect } from 'react';
import SkeletonLoading from '../Skeleton';
import styles from './ProductSkeleton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function ProductSkeleton({height=300}) {
    return (
        <div className={cx('card')}>
            <div className={cx('card-body')}>
                <SkeletonLoading className={cx("img")} height={height}   count={1} ></SkeletonLoading>
            </div>
            <div className={cx('card-content')}>
                <SkeletonLoading className={cx("product-title")}    count={1}></SkeletonLoading>
                <SkeletonLoading  className={cx("product-price")}   count={1}></SkeletonLoading>
            </div>
        </div>
    );
}

export default memo(ProductSkeleton);

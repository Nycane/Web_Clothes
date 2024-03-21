import classNames from 'classnames/bind';
import ReactImageMagnify from 'react-image-magnify';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ImageMagnify.module.scss';
const cx = classNames.bind(styles);
function ImageMagnify({ src }) {
    return (
        <div
            className={cx('image-magnify', {
                // isLoading:isLoading
            })}
        >
            {/* { !isLoading */}
            <ReactImageMagnify
                {...{
                    fadeDurationInMs: 500,
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: src?.image || 'https://cuocsongdungnghia.com/wp-content/uploads/2018/05/loi-hinh-anh.jpg',
                    },
                    largeImage: {
                        src: src?.image || 'https://cuocsongdungnghia.com/wp-content/uploads/2018/05/loi-hinh-anh.jpg',
                        alt: 'Wristwatch by Ted Baker London',
                        width: 2000,
                        height: 1000,
                    },
                    enlargedImagePosition: 'over',
                }}
            />
            {/* :<Skeleton  height={1000}></Skeleton>} */}
        </div>
    );
}

export default ImageMagnify;

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Image from '../../../../components/Img';
import SkeletonLoading from '../../../../components/Loading/Skeleton/Skeleton';
import ImageMagnify from '../ImageMagnify';
import styles from './CustomPaging.module.scss';
const cx = classNames.bind(styles);
function SampleNextArrow(props) {
    const className = cx('arrow-next');
    const { onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
        </div>
    );
}

function SamplePrevArrow(props) {
    const className = cx('arrow-prev');
    const { onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
        </div>
    );
}
function CustomPaging({ images }) {
    const isLoading = useSelector((state) => state.product.isLoading);
    const settings = {
        customPaging: function (i) {
            const img = images[i]?.image;
            return <div>{<Image src={img} alt="abc" width="100%" height="100%" />}</div>;
        },
        dots: true,
        dotsClass: `${cx('slick-dots')} ${cx('slick-thumb')}`,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots) => (
            <ul>
                {dots.map((dot) => (
                    <li
                        key={dot.key}
                        className={cx(dot.props.className, {
                            // isLoading: isLoading,
                        })}
                    >
                        {dot.props.children}
                    </li>
                ))}
            </ul>
        ),
    };
    return (
        <>
            <div className={cx('slider-wrap')}>
                {isLoading ? (
                    <SkeletonLoading className={cx('slider-wrap-skeleton')}></SkeletonLoading>
                ) : (
                    <Slider {...settings}>
                        {images.map((e, i) => {
                            return (
                                <div key={i}>
                                    <ImageMagnify src={e} />
                                </div>
                            );
                        })}
                    </Slider>
                )}
            </div>
        </>
    );
}

export default CustomPaging;

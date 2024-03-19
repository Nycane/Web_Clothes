import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './SliderCustom.module.scss';

const cx = classNames.bind(styles);

function SliderCustom({
    children,
    slShow = 5,
    countScroll = 2,
    dots = false,
    border = false,
    padding = false,
    margin = false,
    customCss = null,
    customResponsive = [],
}) {
    const settings = {
        infinite: true,
        speed: 500,
        classname: customCss,
        slidesToShow: slShow,
        // centerMode: true,
        centerPadding: '0px',
        slidesToScroll: countScroll,
        arrows: false,
        // adaptiveHeight: true,
        // variableWidth: true,
        dots: dots,
        responsive: customResponsive,
    };
    return (
        <div
            className={cx('slider-wrap', {
                border: border,
                padding: padding,
                margin:margin
            })}
        >
            <Slider className={customCss} {...settings}>
                {children}
            </Slider>
        </div>
    );
}

export default SliderCustom;

import SliderContent from './SliderContent';
import Image from '../../../../../components/Img';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
const cx = classNames.bind(styles);
function SliderHeader({listImg,children }) {
    var settings = {
        // dots: true,
        infinite: true,
        // fade: true,
        // speed: 200,
        loop: true,
        // pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // speed: 1000,
        fade: false,
        // autoplay: true,
        // infinite: true,
        autoplaySpeed: 5000,
        // // cssEase: 'linear',
        // slidesToShow: 1,
        // slidesToScroll: 1,
        cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
        // responsive: [
        //     {
        //       breakpoint: 1024,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //         infinite: true,
        //         dots: true
        //       }
        //     },
        //     {
        //       breakpoint: 600,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //         initialSlide: 1
        //       }
        //     },
        //     {
        //       breakpoint: 480,
        //       settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //       }
        //     }
        //   ]
    };
    return (
        <div className={cx('slider-wrap')}>
            {/* header */}
            {children}
            {/* header */}

            {/* Slider Header*/}
            <Slider {...settings}>
                {listImg.map((e,i)=>{
                    return (
                        <div key={i} className={cx('slider-header')}>
                        <Image
                            alt="Slider1"
                            src={e.imgSrc}
                        ></Image>
                        {/* <div className={cx('slider-content')}> */}
                            <SliderContent
                                titleSmall={e.titleSmall}
                                titleLarge={e.titleLarger}
                            ></SliderContent>
                        {/* </div> */}
                    </div>
                    )
                })}
            </Slider>
            {/* Slider */}

        </div>
    );
}

export default SliderHeader;

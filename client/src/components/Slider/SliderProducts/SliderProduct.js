import { faAngleLeft, faAngleRight, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { SHOP_PATHS } from '../../../constants';
import Card from '../../Products/Card';
import styles from './SliderProduct.module.scss';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
// Custom Arrow
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
// Custom Arrow

function SliderProducts({ title, text = '', slShow = 5, titleCenter = false, products = []}) {
    const isLoading = useSelector((state)=>state.product.isLoading)
    const settings = {
        infinite: products.length >= 4 ? true : false,
        speed: 500,
        slidesToShow: slShow,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: products.length >= 4 ? true : false,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    infinite: products.length >= 3 ? true : false,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    infinite: products.length >= 2 ? true : false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };
    return (
        <div style={{ margin: '95px 0px 65px 0px' }}>
            <Container fluid={true}>
                <Row style={{ padding: '0px 12px 45px 12px' }}>
                    <Col lg={6} md={6} sm={12}>
                        <h2
                            className={cx('title', {
                                center: titleCenter,
                            })}
                        >
                            {title}
                        </h2>
                    </Col>
                    {/* style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }} */}
                    <Col lg={6} md={6} smm={12}>
                        <div className={cx('text-icon')}>
                            <Link to={SHOP_PATHS.SHOP}>
                                {text && (
                                    <>
                                        {text}
                                        <FontAwesomeIcon
                                            style={{ marginLeft: '20px' }}
                                            icon={faArrowRightLong}
                                        ></FontAwesomeIcon>
                                    </>
                                )}
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className={cx('slider-wrap')}>
                                <Slider {...settings}>
                                    {products?.map((e, i) => {
                                        return <Card isLoading={isLoading} index={i} product={e} key={e.id}></Card>;
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SliderProducts;

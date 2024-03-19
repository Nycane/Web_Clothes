import { Col, Container, Row } from 'react-bootstrap';
import { SHOP_PATHS } from '../../../../constants';
import Image from '../../../../components/Img';
import styles from './Banner2.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Banner2({listImg}) {
    return (
        <Container fluid={true}>
            <Row>
                {listImg.map((e, i) => {
                    return (
                        <Col key={i} lg={6} md={6} style={{ padding: 0 }}>
                            <div className={cx('wrap-img')}>
                                <Image
                                    className={cx('img')}
                                    alt="banner sale2"
                                    src={e.imgSrc}
                                    style={e.style ? {filter: 'hue-rotate(10102000deg) brightness(0.9)'}:{} }
                                ></Image>
                                <div className={cx('wrap-content')}>
                                    <h3 className={cx('title')}>{e.title}</h3>
                                    <h1 className={cx('title-sale')}>{e.titleSale}</h1>
                                    <Link to={SHOP_PATHS.SHOP} className={cx('button')}>
                                        show now
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
            <Row className={cx('row-info')}>
                <Col lg={3} md={6}>
                    <div className={cx('wrap-info',"mt-45")}>
                        <h2 className={cx('title-number')}>1</h2>
                        <h2 className={cx('title')}>Free Shipping</h2>
                        <p className={cx('text')}>Capped at $39 per order </p>
                    </div>
                </Col>
                <Col lg={3} md={6}>
                    <div className={cx('wrap-info',"mt-45")}>
                        <h2 className={cx('title-number')}>2</h2>
                        <h2 className={cx('title')}>SECURETY PAYMENTS</h2>
                        <p className={cx('text')}>Up to 12 months installments </p>
                    </div>
                </Col>
                <Col lg={3} md={6}>
                    <div className={cx('wrap-info',"mt-45")}>
                        <h2 className={cx('title-number')}>3</h2>
                        <h2 className={cx('title')}>14-DAY RETURNS</h2>
                        <p className={cx('text')}>Shop with confidence </p>
                    </div>
                </Col>
                <Col lg={3} md={6}>
                    <div className={cx('wrap-info',"mt-45")}>
                        <h2 className={cx('title-number')}>4</h2>
                        <h2 className={cx('title')}>24/7 SUPPORT</h2>
                        <p className={cx('text')}>Delivered to your door </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Banner2;

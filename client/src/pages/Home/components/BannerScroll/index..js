import { Container, Col, Row } from 'react-bootstrap';
// import constants from '../../../../constants';
import { SHOP_PATHS } from '../../../../constants';
import styles from './BannerScroll.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function BannerScroll() {
    return (
        <Container fluid={true} lg={12} md={12} sm={12} >
            <Row>
                <Col style={{ padding: 0 }}>
                    <div className={cx('img-scroll')}>
                        <div className={cx('img-content')}>
                            <div className={cx('wrap-title')}>
                                <h3 className={cx('title')}>FASHION WEEKEND </h3>
                                <h3 className={cx('title')}>SALE !</h3>
                            </div>
                            <div className={cx('wrap-button')}>
                                <Link to={SHOP_PATHS.SHOP} className={cx('button')}>shop now</Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default BannerScroll;

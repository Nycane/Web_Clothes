import { Col, Row, Container } from 'react-bootstrap';
import Image from '../../../../components/Img';
import classNames from 'classnames/bind';
import styles from './Banner1.module.scss';
import { SHOP_PATHS } from '../../../../constants';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Banner1({listImg,shopPath}) {
    return (
        <Container className={cx('banner-wrap')} fluid={true}>
            <Row>
                {listImg.map((e, i) => {
                    return (    
                        <Col key={i} lg={4} md={4} sm={12} style={{ padding: 0 }}>
                            <div className={cx('img-wrap')}>
                                <Image
                                    className={cx('banner-img')}
                                    alt="banner"
                                    src={e.imgSrc}
                                ></Image>
                                <div className={cx('banner-info')}>
                                    <Link to={SHOP_PATHS.SHOP} className={cx('btn')}>
                                        {e.title}
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default Banner1;

import { Container, Col, Row } from 'react-bootstrap';
import Image from '../../Img/Img';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import { Link } from 'react-router-dom';
import {ROUTES_PATHS, SHOP_PATHS} from '../../../constants';
const cx = classNames.bind(styles);
function BannerCustom({
    left = false,
    right = false,
    img = 'https://thuemaychuao.net/wp-content/uploads/2021/10/img.gif',
    title,
    text,
    btn = false,
    customText = false,
    customTitle = false,
    customContent = false,
    customImg = false
}) {
    return (
        <Container fluid={true} className={cx('banner-wrap')}>
            {left && (
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <div className={cx('banner-img')}>
                            <Image className={ cx('img')} src={img} alt=""></Image>
                        </div>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <div className={cx('content')}>
                         <h2 className={cx('title')}>{title}</h2>
                         <h1 className={cx('text')}>{text}</h1>
                            {btn && (
                                <div>
                                    <Link to={SHOP_PATHS.SHOP} className={cx('btn')}>
                                        shop now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            )}
            {right && (
                <Row>
                    <Col lg={6} md={6}>
                        <div className={customContent || cx('content')}>
                            <h2 className={ customTitle || cx('title')}>{title}</h2>
                            <h1 className={ customText || cx('text')}>{text}</h1>
                            {btn && (
                                <div>
                                    <Link className={cx('btn')}>sale up to 40%</Link>
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col lg={6} md={6}>
                        <div className={cx('banner-img',{
                              [customImg]:customImg   
                            })}>
                            <Image className={cx('img')} src={img} alt=""></Image>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default BannerCustom;

import { faDribbble, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../../../components/Img';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);
function Footer() {
    return (
        <>
            <Container fluid={true} className={cx('footer')}>
                <Row style={{ marginBottom: '65px' }}>
                    <Col>
                        <div className={cx('img-logo')}>
                            <Image
                                alt="logo"
                                src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/logo.png"
                            ></Image>
                        </div>
                    </Col>
                </Row>
                <Row style={{ padding: '0px 30px' }}>
                    <Col lg={3} md={6} sm={12} style={{ marginBottom: '20px' }}>
                        <div className={cx('content-left', 'text-sm')}>
                            <div className={cx('text-content')}>
                                <p>+866.597.2742</p>
                                <p>support@mafoil.com</p>
                            </div>
                            <div className={cx('logo-content')}>
                                <FontAwesomeIcon className={cx('icon-social')} icon={faTwitter}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-social')} icon={faFacebookF}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-social')} icon={faDribbble}></FontAwesomeIcon>
                                <FontAwesomeIcon className={cx('icon-social')} icon={faInstagram}></FontAwesomeIcon>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={6} style={{ marginBottom: '20px' }}>
                        <div className={cx('content-center', 'text-sm')}>
                            <div className={cx('title-content')}>
                                <h2>account</h2>
                            </div>
                            <div className={cx('text-content')}>
                                <p>Career at Bakye</p>
                                <p>About us</p>
                                <p>Sustainability</p>
                                <p>Press</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={6} style={{ marginBottom: '20px' }}>
                        <div className={cx('content-center')}>
                            <div className={cx('title-content')}>
                                <h2>help</h2>
                            </div>
                            <div className={cx('text-content')}>
                                <p>FAQ</p>
                                <p>Shipping </p>
                                <p>Returns</p>
                                <p>Order Status</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} md={6} style={{ marginBottom: '20px' }}>
                        <div className={cx('content-right')}>
                            <div className={cx('title-content')}>
                                <h2>Newsletter</h2>
                            </div>
                            <div className={cx('text-content')}>
                                <p>Subscribe to the weekly newsletter for all the latest updates</p>
                            </div>
                            <div className={cx('form-group')}>
                                <form>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        aria-describedby="helpId"
                                        placeholder="Email ..."
                                        autoComplete='email'
                                    />
                                </form>
                                <FontAwesomeIcon className={cx('icon')} icon={faEnvelope}></FontAwesomeIcon>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className={cx('text-bottom')}>© 2023 - WP By Wpbingo </div>
                    </Col>
                </Row>
            </Container>
          
        </>
    );
}

export default Footer;

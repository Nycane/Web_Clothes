import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavigateC.module.scss';
const cx = classNames.bind(styles);
function NavigateC() {
    const location = useLocation();
    return (
        <Container>
            <Row>
                <Col>
                    <div className={cx('navigate')}>
                        <Link
                            className={cx('nav-link', {
                                active: location.pathname==='/cart',
                            })}
                            to="/cart"
                        >
                            Cart
                        </Link>
                        <Link
                            className={cx('nav-link', {
                                active: location.pathname==='/checkout',
                            })}
                            to="/checkout"
                        >
                            Checkout
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default NavigateC;

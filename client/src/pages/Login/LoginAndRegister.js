import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from '../../components/Img';
import Register from './components/Register';
import Login from './components/Login';
import styles from './LoginAndRegister.module.scss';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function LoginAndRegister() {
    // -----------------------------------------
    const [toggle, setToggle] = useState('signin');
    const scrollPosition = useRef(null)
    const user = useSelector(state=>state.user)
     // check user already logged in 
     if(user && user.isAuth){
        return <Navigate to="/" replace></Navigate>
    }
    return (
        <Container>
            <Row>
                <Col>
                    <div ref={scrollPosition} className={cx('wrap')}>
                        <div className={cx('singin-img')}>
                            <Image
                                className={cx('img')}
                                alt="Sign In"
                                src="https://res.cloudinary.com/djdsp9etg/image/upload/v1703148587/image/sign-in_azksru.jpg"
                            ></Image>
                            <h2
                                className={cx('title-login', {
                                    active: toggle === 'signin',
                                })}
                            >
                                Sign In
                            </h2>
                            <h2
                                className={cx('title-register', {
                                    active: toggle === 'register',
                                })}
                            >
                                Register
                            </h2>
                        </div>
                        {/* ---------------form login------------------- */}
                        <Login scrollPosition={scrollPosition} setToggle={setToggle} toggle={toggle}></Login>
                        {/* -------------form register---------------- */}
                        <Register scrollPosition={scrollPosition}  toggle={toggle} setToggle={setToggle}></Register>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginAndRegister;

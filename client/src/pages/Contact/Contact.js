/* eslint-disable jsx-a11y/iframe-has-title */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
import { faDribbble, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import IconLoading from '../../components/Loading/IconLoading/IconLoading'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import useValidate from '../../components/Hook/useValidate';
import { addContact } from '../../redux/slice/userSlice';
const cx = classNames.bind(styles);
function Contact(props) {
    const isContact = useSelector((state=>state.user.isContact))
    const dispatch = useDispatch();
    const options = {
        email: yup
            .string()
            .trim()
            .email('Please enter a valid email address: Example@gmail.com')
            .required('This field cannot be empty'),
        name: yup
            .string()
            .trim()
            .required('This field cannot be empty')
            .matches(/^[A-Za-z\u00C0-\u1EF9\s]*$/, 'Cannot contain special characters or numbers')
            .max(200, 'Name cannot exceed 50 characters'),
        phone: yup
            .string()
            .trim()
            .required('This field cannot be empty')
            .max(11, 'Please enter a correct phone number ')
            .matches(/^[0-9]+$/, 'Must be a valid number'),
        message: yup
            .string()
            .trim()
            .required('This field cannot be empty')
            .max(500, 'Message cannot exceed 500 characters'),
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useValidate(options);

    const onSubmit = async (data) => {
        dispatch(addContact(data))
            .unwrap()
            .then(() => {
                reset();
            });
    };

    return (
        <>
            <Container fluid={true}>
                <Row>
                    <Col lg={12} md={12} sm={12} style={{ padding: 0 }}>
                        <iframe
                            width="100%"
                            height="700px"
                            id="gmap-canvas"
                            src="https://maps.google.com/maps?q=Việt Nam&t=&z=10&ie=UTF8&iwloc=&output=embed"
                        ></iframe>
                    </Col>
                </Row>
            </Container>

            <Container style={{ marginTop: '90px', marginBottom: '90px' }}>
                <Row>
                    <Col lg={8} md={7}>
                        <form className={cx('contact-form')} onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <h1 className={cx('title')}>Get In Touch</h1>
                                <Col lg={4}>
                                    <label className={cx('form-label')}>Name</label>
                                    <input
                                        {...register('name')}
                                        className={cx('form-input')}
                                        type="text"
                                        placeholder="Name"
                                    ></input>
                                    <span className={cx('error')}>{errors.name?.message}</span>
                                </Col>
                                <Col lg={4}>
                                    <label className={cx('form-label')}>Email</label>
                                    <input
                                        {...register('email')}
                                        className={cx('form-input')}
                                        type="text"
                                        placeholder="Email adress"
                                    ></input>
                                    <span className={cx('error')}>{errors.email?.message}</span>
                                </Col>
                                <Col lg={4}>
                                    <label className={cx('form-label')}>Phone</label>
                                    <input
                                        {...register('phone')}
                                        className={cx('form-input')}
                                        type="text"
                                        placeholder="Number Phone"
                                    ></input>
                                    <span className={cx('error')}>{errors.phone?.message}</span>
                                </Col>
                                <Col lg={12}>
                                    <label className={cx('form-label')}>Your message</label>
                                    <textarea
                                        {...register('message')}
                                        className={cx('form-textarea')}
                                        placeholder="Comment of Message"
                                    ></textarea>
                                    <span className={cx('error')}>{errors.message?.message}</span>
                                </Col>
                            </Row>
                            <button type="submit" className={cx('form-button')}>
                              {!isContact ? <IconLoading></IconLoading> :  "send message"}
                            </button>
                        </form>
                    </Col>
                    <Col lg={4} md={5}>
                        <div className={cx('info-box')}>
                            <div className={cx('info-wrap')}>
                                <h2 className={cx('title')}>Address</h2>
                                <a href="asd" className={cx('text')}>
                                    14 LE Gounlburn St, Sydney 1198NSA.
                                </a>
                            </div>
                            <div className={cx('info-wrap')}>
                                <h2 className={cx('title')}>Phone</h2>
                                <a href="as" className={cx('text')}>
                                    (+089) 19918989
                                </a>
                            </div>
                            <div className={cx('info-wrap')}>
                                <h2 className={cx('title')}>Email</h2>
                                <a href="as" className={cx('text')}>
                                    support@mafoil.com
                                </a>
                            </div>
                            <div className={cx('info-wrap')}>
                                <h2 className={cx('title')}>Opening Time</h2>
                                <a href="as" className={cx('text')}>
                                    8:00Am – 10:00Pm, Sunday Close
                                </a>
                            </div>
                            <div className={cx('info-wrap')}>
                                <h2 className={cx('title')}>Follow Us On</h2>
                                <div className={cx('list-icon')}>
                                    <FontAwesomeIcon className={cx('icon-social')} icon={faTwitter}></FontAwesomeIcon>
                                    <FontAwesomeIcon className={cx('icon-social')} icon={faFacebookF}></FontAwesomeIcon>
                                    <FontAwesomeIcon className={cx('icon-social')} icon={faDribbble}></FontAwesomeIcon>
                                    <FontAwesomeIcon className={cx('icon-social')} icon={faInstagram}></FontAwesomeIcon>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Contact;

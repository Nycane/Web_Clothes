/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SkeletonLoading from '../../components/Loading/SkeletonLoading';
import * as yup from 'yup';
import Validate from '../../components/Hook/useValidate';
import { addOrder, createPayment } from '../../redux/slice/orderSlice';
import { getUserInfo } from '../../redux/slice/userSlice';
import CartLeft from '../Cart/Component/CartLeft';
import NavigateCart from '../Cart/Component/NavigateC';
import styles from './Checkout.module.scss';
const cx = classNames.bind(styles);
function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector((state) => state.cart);
    const { info: user, isLoading } = useSelector((state) => state.user);
    const isAuth = useSelector((state) => state.user.isAuth);
    const [addressOther, setAddressOther] = useState(false);
    const btnSubmit = useRef();
    // Validate form
    const options = {
        payment: yup.string().trim().required('Please select a payment option'),
        notes: yup.string(),
        fullname: yup.string().trim().required('This field cannot be empty'),
        email: yup
            .string()
            .trim()
            .email('Please enter a valid email address: Example@gmail.com')
            .required('This email field cannot be empty'),
        address: yup.string().trim().required('This field cannot be empty'),
        phone: yup.string().trim().typeError('This field is phone number').required('This field cannot be empty'),
    };
    const optionsForm = {
        defaultValues: {
            fullname: user?.userName,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
            notes: '',
        },
    };
    // console.log("options form>>",optionsForm)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = Validate(options, optionsForm);
    // ---------------------------------------

    // handle add  order
    const onSubmit = async (data) => {
        // Kiểm tra phương thức thanh toán
        if (data.payment === 'VNpay') {
            const newData = {
                amount: carts.total,
                bankCode: '',
                language: 'vn',
                info: Object.assign({ userId: user.id }, data),
                product: carts,
                accessToken: user.accessToken,
            };
            dispatch(createPayment(newData));
            reset();
        } else {
            const newData = {
                accessToken: user.accessToken,
                info: { userId: user.id, ...data },
                product: carts,
            };
            // nếu thanh toán thành công chuyển sang trang order
            dispatch(addOrder(newData))
                .unwrap()
                .then(({ data }) => {
                    navigate(`order/?id=${data.orderId}`, { replace: true });
                    reset();
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError);
                });
        }
    };
    // Xử lý check nhập địa chỉ khác
    useEffect(() => {
        if (addressOther) {
            reset({ fullname: '', email: '', phone: '', address: '', payment: '', notes: '' });
        } else {
            reset(optionsForm.defaultValues);
        }
    }, [addressOther]);
    // get user info
    useEffect(() => {
        isAuth &&
            dispatch(getUserInfo(user))
                .unwrap()
                .then((user) => {
                    // Cập nhật giá trị mặc định của form khi thông tin người dùng thay đổi
                    reset({
                        fullname: user?.data?.userName,
                        email: user?.data?.email,
                        phone: user?.data?.phone,
                        address: user?.data?.address,
                        notes: '',
                    });
                });
    }, []);

    // Kiểm tra nếu giở hàng trống chuyển về trang cart
    if (!carts?.listProducts?.length > 0) {
        return <Navigate to="/cart" replace />;
    }
    return (
        <>
            {isAuth && <NavigateCart></NavigateCart>}
            {/* style={{marginTop:90}} */}
            <Container fluid>
                <Row>
                    {user?.id ? (
                        <>
                            <Col lg={7}>
                                <div className={cx('billing-wrap')}>
                                    <h3 className={cx('title')}>Billing details</h3>
                                    {/* form default */}
                                    <form
                                        autoComplete="no"
                                        noValidate
                                        onSubmit={handleSubmit(onSubmit)}
                                        className={cx('billing-field')}
                                    >
                                        <p className={cx('field-item')}>
                                            <label htmlFor="fullname">
                                                Full name <span className={cx('required')}>*</span>
                                            </label>
                                            {!isLoading ? (
                                                <input
                                                    className={cx('input')}
                                                    disabled={!addressOther}
                                                    {...register('fullname')}
                                                    type="text"
                                                    id="fullname"
                                                ></input>
                                            ) : (
                                                <SkeletonLoading className={cx('input')}></SkeletonLoading>
                                            )}
                                            <span className={cx('error')}>{errors.fullname?.message}</span>
                                        </p>

                                        <p className={cx('field-item')}>
                                            <label htmlFor="address">
                                                Address <span className={cx('required')}>*</span>
                                            </label>
                                            {!isLoading ? (
                                                <input
                                                    className={cx('input')}
                                                    disabled={!addressOther}
                                                    {...register('address')}
                                                    type="text"
                                                    id="address"
                                                    placeholder="House number and street name"
                                                ></input>
                                            ) : (
                                                <SkeletonLoading className={cx('input')}></SkeletonLoading>
                                            )}
                                            <span className={cx('error')}>{errors.address?.message}</span>
                                        </p>

                                        <p className={cx('field-item')}>
                                            <label htmlFor="phone">
                                                Phone <span className={cx('required')}>*</span>
                                            </label>
                                            {!isLoading ? (
                                                <input
                                                    className={cx('input')}
                                                    disabled={!addressOther}
                                                    {...register('phone')}
                                                    type="text"
                                                    id="phone"
                                                ></input>
                                            ) : (
                                                <SkeletonLoading className={cx('input')}></SkeletonLoading>
                                            )}
                                            <span className={cx('error')}>{errors.phone?.message}</span>
                                        </p>

                                        <p className={cx('field-item')}>
                                            <label htmlFor="email">
                                                Email Address <span className={cx('required')}>*</span>
                                            </label>
                                            {!isLoading ? (
                                                <input
                                                    className={cx('input')}
                                                    disabled={!addressOther}
                                                    {...register('email')}
                                                    type="text"
                                                    id="email"
                                                ></input>
                                            ) : (
                                                <SkeletonLoading className={cx('input')}></SkeletonLoading>
                                            )}
                                            <span className={cx('error')}>{errors.email?.message}</span>
                                        </p>

                                        <p className={cx('field-item')}>
                                            <label htmlFor="notes">Order notes(optional)</label>
                                            {!isLoading ?<textarea
                                                {...register('notes')}
                                                className={cx('textarea')}
                                                placeholder="Notes about your order, e.g. special notes for delivery."
                                                id="notes"
                                            ></textarea> : <SkeletonLoading className={cx('textarea')}></SkeletonLoading>}
                                        </p>
                                        <button ref={btnSubmit} type="submit"></button>
                                        {(!user.email || !user.phone || !user.address || !user.userName) && (
                                            <Link to="/account/detail" className={cx('update-user')}>
                                                Update info ?
                                            </Link>
                                        )}
                                    </form>
                                    {/* form default */}

                                    <p className={cx('field-item')}>
                                        <input
                                            onChange={(e) => setAddressOther(e.target.checked)}
                                            id="addressOther"
                                            type="checkbox"
                                        ></input>
                                        <label style={{ paddingLeft: '8px' }} htmlFor="addressOther">
                                            SHIP TO A DIFFERENT ADDRESS?
                                        </label>
                                    </p>
                                </div>
                            </Col>
                            <Col lg={5} style={{ padding: '0px 15px' }}>
                                <CartLeft
                                    checkout
                                    products={carts?.listProducts}
                                    btnSubmit={btnSubmit}
                                    register={register}
                                    errors={errors.payment?.message}
                                ></CartLeft>
                            </Col>{' '}
                        </>
                    ) : (
                        <Col lg={12} md={12}>
                            <div className={cx('redirect-login')}>
                                <h1 className={cx('redirect-title')}>Please Login Checkout</h1>
                                <Link
                                    to="/login"
                                    state={{ from: { pathname: '/checkout' } }}
                                    className={cx('redirect-btn')}
                                >
                                    Login
                                </Link>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}

export default Checkout;

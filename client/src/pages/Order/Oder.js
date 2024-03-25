/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TextLoading from '../../components/Loading/TextLoading/';
import cartSlice from '../../redux/slice/cartSlice';
import { getOrderDetailById, getResultPayment } from '../../redux/slice/orderSlice';
import { formatPrice } from '../../utils/myUtils';
import styles from './Order.module.scss';
const cx = classNames.bind(styles);
function Order() {
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const orderId = urlParams.get('id');
    const user = useSelector((state) => state.user.info);
    const { orderDetail: order, isLoading } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    // Lấy thông tin đơn hàng khi thanh toán
    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetailById({ ...user, orderId }));
            dispatch(cartSlice.actions.remove('reset'));
        } else {
            const data = { ...user, search: location.search };
            dispatch(getResultPayment(data))
                .unwrap()
                .then(({ data }) => {
                    // Thanh toán thất bại chuyển về trang thanh toán
                    if (data.rspCode !== '00') {
                        navigate('/checkout', { replace: true });
                        return;
                    }
                    dispatch(cartSlice.actions.remove('reset'));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    return (
        <>
            {isLoading ? (
                <TextLoading />
            ) : (
                <Container fluid>
                    <Row>
                        <Col lg={12} md={12}>
                            <div className={cx('order-wrap')}>
                                <p className={cx('order-thank')}>Thank you. Your order has been received.</p>
                                <ul className={cx('order-detail')}>
                                    <li>
                                        Order number: <strong>{order?.orderDetail?.id}</strong>
                                    </li>
                                    <li>
                                        Date:{' '}
                                        <strong>{moment(order?.orderDetail?.created_at).format('MMMM D, YYYY')}</strong>
                                    </li>
                                    <li>
                                        Email: <strong>{order?.orderDetail?.email}</strong>
                                    </li>
                                    <li>
                                        Total:{' '}
                                        <strong>
                                            {formatPrice.format(
                                                !order?.orderDetail?.coupon_code
                                                    ? order?.orderDetail?.total_price
                                                    : order?.orderDetail?.discount_amount,
                                            )}
                                        </strong>
                                    </li>
                                    <li>
                                        Payment method: <strong>{order?.orderDetail?.payment_method}</strong>
                                    </li>
                                </ul>
                                <h2 className={cx('title')}>Order details</h2>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th className={cx('th')} scope="row">
                                                Product
                                            </th>
                                            <th className={cx('th')} scope="row">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.productDetail?.map((e, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className={cx('td')}>
                                                        {e.name} × {e.quantity}
                                                        {e.color !== 'default' && e.size !== 'default' && (
                                                            <ul className={cx('color-size')}>
                                                                <li className={cx('title-color')}>Color:</li>
                                                                <li style={{ listStyleType: 'none' }}>{e.color}</li>

                                                                <li className={cx('title-color')}>Size:</li>
                                                                <li style={{ listStyleType: 'none' }}>{e.size}</li>
                                                            </ul>
                                                        )}
                                                    </td>
                                                    <td className={cx('td')}> {formatPrice.format(e.total)}</td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td className={cx('td')}>Subtotal:</td>
                                            <td className={cx('td')}>
                                                {' '}
                                                {formatPrice.format(order?.orderDetail?.total_price)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={cx('td')}>Shipping:</td>
                                            <td className={cx('td')}> {order?.orderDetail?.shipping}</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('td')}>Payment method:</td>
                                            <td className={cx('td')}> {order?.orderDetail?.payment_method}</td>
                                        </tr>
                                        {order?.orderDetail?.coupon_code && (
                                            <>
                                                <tr>
                                                    <td className={cx('td')}>Coupon Code:</td>
                                                    <td className={cx('td')}> {order?.orderDetail?.coupon_code}</td>
                                                </tr>

                                                <tr>
                                                    <td className={cx('td')}>Discount Amount:</td>
                                                    <td className={cx('td')}> -10%</td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className={cx('td')}>Total:</td>
                                            <td className={cx('td')}>
                                                {' '}
                                                {formatPrice.format(
                                                    !order?.orderDetail?.coupon_code
                                                        ? order?.orderDetail?.total_price
                                                        : order?.orderDetail?.discount_amount,
                                                )}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className={cx('billing-address')}>
                                <h5 className={cx('billing-title')}>Billing address</h5>
                                <div className={cx('billing-group')}>
                                    <p className={cx('billing-item')}>{order?.orderDetail?.fullname}</p>
                                    <p className={cx('billing-item')}>{order?.orderDetail?.address}</p>
                                    <p className={cx('billing-item')}>{order?.orderDetail?.phone}</p>
                                    <p className={cx('billing-item')}>{order?.orderDetail?.email}</p>
                                    <p className={cx('billing-item')}>{order?.orderDetail?.notes}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default Order;

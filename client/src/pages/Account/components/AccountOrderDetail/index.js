import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetailById } from '../../../../redux/slice/orderSlice';
import classNames from 'classnames/bind';
import styles from './AccountOrderDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {formatPrice,formatDate} from '../../../../utils/myUtils';
const cx = classNames.bind(styles);
function AccountOrderDetail({user}) {
    const orderId = useParams()
    const order = useSelector((state) => state.order.orderDetail);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            getOrderDetailById({
                orderId: orderId.id,
                ...user
            }),
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container fluid={true}>
            <Row>
                <Col lg={12} md={12}>
                   
                <div className={cx('order-wrap')}>
                                <p className={cx('order-thank')}>Order <strong className={cx('text-focus')}>#{order?.orderDetail?.id}</strong> was placed on <strong className={cx('text-focus')}>{formatDate(order?.orderDetail?.created_at)}</strong> and is currently <strong className={cx("text-focus")}>{order?.orderDetail?.status===1?"Success":"Processing"}</strong>.</p>
                                <h2 className={cx('order-detail-title')}>Order details</h2>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th
                                                className={cx('td')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderRight: 'none' }}
                                            >
                                                Product
                                            </th>
                                            <th
                                                className={cx('td')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderLeft: 'none' }}
                                            >
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.productDetail?.map((e, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className={cx('td')}>
                                                        <span className={cx("text-gray")}>{e.name} × {e.quantity}</span>
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
                                            <td className={cx('td')}><span className={cx("text-bold")}>Subtotal:</span></td>
                                            <td className={cx('td')}>
                                                {' '}
                                                {formatPrice.format(order?.orderDetail?.total_price)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={cx('td')}><span className={cx("text-bold")} >Shipping:</span></td>
                                            <td className={cx('td')}> {order?.orderDetail?.shipping}</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('td')}><span className={cx("text-bold")} >Payment method:</span></td>
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
                                            <td className={cx('td')}><span className={cx("text-bold")} >Total:</span></td>
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
    );
}

export default AccountOrderDetail;

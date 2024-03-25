/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PaginateCustom from '../../../../components/PaginateCustom';
import { formatDate, formatPrice, scrollViewToPoint } from '../../../../utils/myUtils';
import styles from './AccountOrder.module.scss';
const cx = classNames.bind(styles);
function AccountOrder() {
    const orders = useSelector((state) => state.order.orders);
    const [currentPage, setCurrentPage] = useState(0);
    const scrollToView = useRef(null);
    const itemperPage = 5;
    const endPage = currentPage * itemperPage + itemperPage;
    const startPage = currentPage * itemperPage;
    const pageCount = Math.ceil(orders?.length / itemperPage);
    // const isLoading = useSelector((state) => state.order.isLoading);
    // const dispatch = useDispatch();
    function onChangePage({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        scrollViewToPoint(scrollToView);
    }
    return (
        <Container fluid={true}>
            <Row>
                <Col lg={12} md={12}>
                    {orders?.length > 0 ? (
                        <>
                            {/* scroll to view */}
                            <div className={cx('scrollToView')} ref={scrollToView}></div>
                            <div className={cx('order-scroll')}>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderRight: 'none' }}
                                            >
                                                Order
                                            </th>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{
                                                    textAlign: 'start',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                }}
                                            >
                                                Date
                                            </th>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{
                                                    textAlign: 'start',
                                                    borderRight: 'none',
                                                    borderLeft: 'none',
                                                }}
                                            >
                                                Status
                                            </th>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{
                                                    textAlign: 'start',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                }}
                                            >
                                                Total
                                            </th>
                                            <th
                                                className={cx('th')}
                                                scope="row"
                                                style={{ textAlign: 'start', borderLeft: 'none' }}
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.slice(startPage, endPage).map((e, i) => {
                                            return (
                                                <tr key={i} className={cx('tr')}>
                                                    <td className={cx('td')}>
                                                        <Link to={`${e.id}`} className={cx('order-id')}>
                                                            {' '}
                                                            #{e.id}
                                                        </Link>
                                                    </td>
                                                    <td className={cx('td')}> {formatDate(e.created_at)}</td>
                                                    <td className={cx('td')}>
                                                        {' '}
                                                        {e.status === 1 ? 'Success' : 'Processing'}
                                                    </td>
                                                    <td className={cx('td')}>
                                                        {formatPrice.format(
                                                            e.discount_amount > 0 ? e.discount_amount : e.total_price,
                                                        )}
                                                        <span className={cx('order-quantity')}>
                                                            for {e.countOrder} item
                                                        </span>
                                                    </td>
                                                    <td className={cx('td')}>
                                                        <Link className={cx('view')} to={`${e.id}`}>
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                                {/* paginate */}
                                <div className={cx('paginate')}>
                                    <PaginateCustom
                                        onInChangePage={onChangePage}
                                        pageCount={pageCount}
                                        customPageLinkBack={cx('custom-pagelink-back')}
                                        customPageLinkNext={cx('custom-pagelink-next')}
                                        isHiddenPageItem={true}
                                        currentPage={currentPage}
                                    ></PaginateCustom>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className={cx('title-order')}>No Order Has Been Made Yet.</h1>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default AccountOrder;

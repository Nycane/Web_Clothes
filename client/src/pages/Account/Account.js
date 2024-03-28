import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ACCOUNT_PATHS } from '../../constants';
import { getUserInfo, logout } from '../../redux/slice/userSlice';
import IconLoading from '../../components/Loading/IconLoading/IconLoading';
import { getOrders } from '../../redux/slice/orderSlice';
import wishlistSlice from '../../redux/slice/wishlistSLice';
import styles from './Account.module.scss';
import AccountChangePassword from './components/AccountChangePassword';
import AccountDashboard from './components/AccountDashboard';
import AccountDetail from './components/AccountDetail';
import AccountLostPassword from './components/AccountLostPassword';
import AccountOrder from './components/AccountOrder';
import AccountOrderDetail from './components/AccountOrderDetail';
import AccountWishList from './components/AccountWishlist';
import SkeletonLoading from '../../components/Loading/SkeletonLoading';
const cx = classNames.bind(styles);
function Account() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathName = location.pathname.split('/');
    // const user = useSelector((state) => state.user.info);
    const { isAuth, isLogout, info: user, isLoading } = useSelector((state) => state.user);

    // Xử lý sự kiện đăng xuất
    function handleLogout() {
        // Gọi hàm logout và truyền vào thông tin của user
        dispatch(logout(user))
            .unwrap()
            .then((data) => {
                // Đăng xuất thành công chuyển về trang login
                dispatch(wishlistSlice.actions.clearWishlist());
                navigate('/login', { replace: true });
            });
    }
    useEffect(() => {
        if (isAuth) {
            dispatch(getUserInfo(user));
            dispatch(getOrders(user));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!isAuth && pathName[pathName.length - 1] === 'lost-password' ? (
                <AccountLostPassword></AccountLostPassword>
            ) : (
                <Container fluid>
                    <Row className={cx('account-wrap')}>
                        <Col lg={4} md={4}>
                            <div className={cx('navbar')}>
                                <ul className={cx('navbar-wrap')}>
                                    <li className={cx('navbar-item')}>
                                        <Link className={cx('text')} to={ACCOUNT_PATHS.ACCOUNT}>
                                            DASHBOARD
                                        </Link>
                                    </li>
                                    <li className={cx('navbar-item')}>
                                        <Link className={cx('text')} to={ACCOUNT_PATHS.ACCOUNT + ACCOUNT_PATHS.ORDER}>
                                            Order
                                        </Link>
                                    </li>
                                    <li className={cx('navbar-item')}>
                                        <Link className={cx('text')} to={ACCOUNT_PATHS.ACCOUNT + ACCOUNT_PATHS.DETAIL}>
                                            ACCOUNT DETAILS
                                        </Link>
                                    </li>
                                    {user?.type_log === 'LOCAL' && (
                                        <li className={cx('navbar-item')}>
                                            <Link
                                                to={ACCOUNT_PATHS.ACCOUNT + ACCOUNT_PATHS.CHANGEPW}
                                                className={cx('text')}
                                            >
                                                CHANGE PASSWORD
                                            </Link>
                                        </li>
                                    )}
                                    <li className={cx('navbar-item')}>
                                        <Link onClick={handleLogout} className={cx('text')}>
                                            LOGOUT {isLogout && <IconLoading></IconLoading>}
                                        </Link>
                                    </li>
                                    <li className={cx('navbar-item')}>
                                        <Link
                                            to={ACCOUNT_PATHS.ACCOUNT + ACCOUNT_PATHS.WISHLIST}
                                            className={cx('text')}
                                        >
                                            WISHLIST
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={8} md={8} style={{ padding: 0 }}>
                            {isLoading ? (
                                <SkeletonLoading className={cx('navbar-content','skeleton')} height={'400px'}></SkeletonLoading>
                            ) : (
                                <div className={cx('navbar-content')}>
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={<AccountDashboard user={user}></AccountDashboard>}
                                        ></Route>
                                        <Route
                                            path={ACCOUNT_PATHS.ORDER}
                                            element={<AccountOrder user={user}></AccountOrder>}
                                        ></Route>
                                        <Route
                                            path={ACCOUNT_PATHS.ORDER_DETAIL}
                                            element={<AccountOrderDetail user={user}></AccountOrderDetail>}
                                        ></Route>
                                        <Route
                                            path={ACCOUNT_PATHS.DETAIL}
                                            element={<AccountDetail user={user}></AccountDetail>}
                                        ></Route>
                                        {user?.type_log === 'LOCAL' && (
                                            <>
                                                <Route
                                                    path={ACCOUNT_PATHS.CHANGEPW}
                                                    element={
                                                        <AccountChangePassword user={user}></AccountChangePassword>
                                                    }
                                                ></Route>
                                                <Route
                                                    path={ACCOUNT_PATHS.LOST_PASSWORD}
                                                    element={<AccountLostPassword user={user}></AccountLostPassword>}
                                                ></Route>
                                            </>
                                        )}
                                        <Route
                                            path={ACCOUNT_PATHS.WISHLIST}
                                            element={<AccountWishList></AccountWishList>}
                                        ></Route>
                                    </Routes>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default Account;

import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../../redux/slice/userSlice';
import wishlistSlice from '../../../../redux/slice/wishlistSLice';
import styles from './AccountDashboard.module.scss';
const cx = classNames.bind(styles);
function AccountDashboard({ user }) {
    // const isLoading = useSelector((state) => state.user.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogout() {
        dispatch(logout(user))
            .unwrap()
            .then((data) => {
                dispatch(wishlistSlice.actions.clearWishlist());
                navigate('/login', { replace: true });
            });
    }

    return (
        <>
            <div className={cx('dashboard-wrap')}>
                <p className={cx('hello-user')}>
                    Hello <span className={cx('text-force')}>{user.userName}</span> (not{' '}
                    <span className={cx('text-force')}>{user.userName}</span>?{' '}
                    {user.id && (
                        <Link onClick={handleLogout} className={cx('a')}>
                            Log out
                        </Link>
                    )}
                    )
                </p>
                <p className={cx('text-info')}>
                    From your account dashboard you can view your recent orders, manage your shipping and billing
                    addresses, and edit your password and account details.
                </p>
            </div>
        </>
    );
}

export default AccountDashboard;

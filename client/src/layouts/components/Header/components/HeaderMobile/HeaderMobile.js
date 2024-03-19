import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { ACCOUNT_PATHS, ROUTES_PATHS, SHOP_PATHS } from '../../../../../constants';
import styles from './HeaderMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function HeaderMobile() {
    const isAuth = useSelector((state)=>state.user.isAuth);
    return (
        <div className={cx('header-mobile')}>
            <ul>
                <Link className={cx('link')} to="/">
                    Home
                </Link>
                <Link className={cx('link')} to={SHOP_PATHS.SHOP}>
                    Shop
                </Link>
                <Link className={cx('link')} to={ROUTES_PATHS.CONTACT}>
                    Contact
                </Link>
                <Link className={cx('link')} to={ROUTES_PATHS.ABOUT}>
                    About
                </Link>
            </ul>
            {!isAuth && <Link to={isAuth?ACCOUNT_PATHS.ACCOUNT:ROUTES_PATHS.LOGIN} className={cx('login-header')}>
                <FontAwesomeIcon className={cx('icon-user')} icon={faUser}></FontAwesomeIcon>
                <p>Login or Register</p>
            </Link>}
        </div>
    );
}

export default HeaderMobile;

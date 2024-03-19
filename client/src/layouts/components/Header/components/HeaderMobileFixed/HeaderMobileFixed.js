import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBorderAll, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ACCOUNT_PATHS, ROUTES_PATHS, SHOP_PATHS } from '../../../../../constants';
import styles from './HeaderMobileFixed.module.scss';
const cx = classNames.bind(styles);
function HeaderMobileFixed({ onInOpenModal, wishListProducts }) {
    const isAuth = useSelector((state)=>state.user.isAuth);
    return (
        <div className={cx('header-mobile-fixed')}>
            <Link to={SHOP_PATHS.SHOP} className={cx('shop')}>
                <FontAwesomeIcon icon={faBorderAll} className={cx('shop-icon')}></FontAwesomeIcon>
                <p className={cx('shop-title')}>shop</p>
            </Link>
            <Link to={isAuth?ACCOUNT_PATHS.ACCOUNT:ROUTES_PATHS.LOGIN} className={cx('account')}>
                <FontAwesomeIcon icon={faUser} className={cx('shop-icon')}></FontAwesomeIcon>
                <p className={cx('shop-title')}>account</p>
            </Link>
            <div onClick={onInOpenModal} className={cx('search')}>
                <FontAwesomeIcon icon={faSearch} className={cx('shop-icon')}></FontAwesomeIcon>
                <p className={cx('shop-title')}>search</p>
            </div>
            <Link to={ROUTES_PATHS.WISHLIST} className={cx('wishlist')}>
                <FontAwesomeIcon icon={faHeart} className={cx('shop-icon', 'wishlist')}></FontAwesomeIcon>
                <p className={cx('shop-title')}>wishlist</p>
                <span className={cx('After')}>{wishListProducts?.length || 0}</span>
            </Link>
        </div>
    );
}

export default HeaderMobileFixed;

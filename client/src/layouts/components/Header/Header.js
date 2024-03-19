import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Image from '../../../components/Img';
import CustomModal from '../../../components/Modal';
import PopoverCart from '../../../components/Popover/PopoverCart';
import PopoverUser from '../../../components/Popover/PopoverUser';
import { ROUTES_PATHS, SHOP_PATHS } from '../../../constants';
import { getWishList } from '../../../redux/slice/wishlistSLice';
import styles from './Header.module.scss';
import HeaderMobile from './components/HeaderMobile/HeaderMobile';
import HeaderMobileFixed from './components/HeaderMobileFixed/HeaderMobileFixed';
import Search from './components/Search';
const cx = classNames.bind(styles);

function Header(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const cartLength = useSelector((state) => state.cart.listProducts);
    const user = useSelector((state) => state.user);
    const isFetch = useSelector((state) => state.wishlist.isFetch);
    const wishListProducts = useSelector((state) => state.wishlist.listProducts);
    // use popover cart
    const [visible, setVisible] = useState(false);
    // use mode mobile
    const [modalSearch, setModalSearch] = useState(false);
    const [modalHeader, setModalHeader] = useState(false);
    // Popover cart
    function showPopoverCart() {
        setVisible(true);
    }
    // Modal search
    function openModalSearch() {
        setModalSearch(true);
    }
    function closeModalSearch() {
        setModalSearch(false);
    }
    // Modal Header
    function openModalHeader() {
        setModalHeader(true);
    }
    function closeModalHeader() {
        setModalHeader(false);
    }

    useEffect(() => {
        if (user?.isAuth && isFetch) {
            dispatch(getWishList(user.info));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetch]);
    useEffect(() => {
        modalHeader && closeModalHeader();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);
    return (
        <>
            <div
                className={cx('header-wrap', {
                    'header-background-white': props.bg,
                })}
            >
                <div
                    onClick={openModalHeader}
                    className={cx('bars', {
                        'is-black': props.bg,
                    })}
                >
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </div>
                <div className={cx('header-left')}>
                    <ul>
                        <li>
                            <Link className={cx('link')} to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to={SHOP_PATHS.SHOP}>
                                Shop
                            </Link>
                        </li>

                        <li>
                            <Link className={cx('link')} to={ROUTES_PATHS.CONTACT}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link className={cx('link')} to={ROUTES_PATHS.ABOUT}>
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to={ROUTES_PATHS.HOME} className={cx('header-center')}>
                    <Image
                        alt="Logo"
                        src={
                            props.bg
                                ? // 'https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/logo.png'
                                  ' https://res.cloudinary.com/djdsp9etg/image/upload/v1703148734/image/logo_igeemb.png'
                                : // 'https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/logo-white.png'
                                  'https://res.cloudinary.com/djdsp9etg/image/upload/v1704255751/image/logo-white_p5yjvz.png'
                        }
                    ></Image>
                </Link>
                <div className={cx('header-right')}>
                    {/* search modal */}
                    <CustomModal
                        modalIsOpen={modalSearch}
                        customCss={cx('fullwidth')}
                        onInCloseModal={closeModalSearch}
                        btnClosed={true}
                    >
                        <Search isModalSearch={modalSearch} onInCloseModal={closeModalSearch}></Search>
                    </CustomModal>

                    <div onClick={openModalSearch} className={cx('search-icon')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon fontSize={22} icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </div>
                    </div>
                    {user && user.isAuth ? (
                        <div>
                            <PopoverUser>
                                <div className={cx('user-icon')}>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon fontSize={22} icon={faUser}></FontAwesomeIcon>
                                    </div>
                                </div>
                            </PopoverUser>
                        </div>
                    ) : (
                        <div className={cx('user-icon')}>
                            <Link to={ROUTES_PATHS.LOGIN} className={cx('icon')}>
                                <FontAwesomeIcon fontSize={22} icon={faUser}></FontAwesomeIcon>
                            </Link>
                        </div>
                    )}
                    <div className={cx('wishlist-icon')}>
                        <Link to={ROUTES_PATHS.WISHLIST} className={cx('icon')}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        </Link>
                        <span className={cx('After')}>{wishListProducts?.length || 0}</span>
                    </div>
                    <div className={cx('cart-icon')}>
                        <PopoverCart visible={visible} setVisible={setVisible}>
                            <div onClick={showPopoverCart} onMouseEnter={showPopoverCart} className={cx('icon')}>
                                <FontAwesomeIcon fontSize={22} icon={faBagShopping}></FontAwesomeIcon>
                            </div>
                        </PopoverCart>
                        <span className={cx('After')}>{cartLength?.length}</span>
                    </div>
                </div>
            </div>

            {/* header mobile*/}
            <CustomModal
                modalIsOpen={modalHeader}
                customBtnClose={cx('custom-btn-close')}
                customCss={cx('custom-modal')}
                onInCloseModal={closeModalHeader}
                btnClosed={true}
            >
                <HeaderMobile></HeaderMobile>
            </CustomModal>

            {/* header mobile fixed */}
            <HeaderMobileFixed onInOpenModal={openModalSearch} wishListProducts={wishListProducts}></HeaderMobileFixed>

            {/* --------------------------------------------- */}
        </>
    );
}

export default Header;

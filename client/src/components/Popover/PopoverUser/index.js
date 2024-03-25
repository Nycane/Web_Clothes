import Popover from '../Popover';
import Tippy from '@tippyjs/react/headless';
import { ROUTES_PATHS, ACCOUNT_PATHS } from '../../../constants';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import styles from './PopoverUser.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { arrayIsEmpty } from '../../../utils/myUtils';
const cx = classNames.bind(styles);
function PopoverUser({ children }) {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.listProducts);
    const handleRedirectCheckout = (e) => {
        if (arrayIsEmpty(cart)) {
            return e.preventDefault();
        }
        navigate('/checkout');
    };
    return (
        <Tippy
            delay={[0, 300]}
            interactive={true}
            placement="bottom-start"
            hideOnClick={false}
            render={(attr) => {
                return (
                    <div className={cx('user-wrap')}>
                        <Popover>
                            <ul className={cx('user-menu')}>
                                <li className={cx('menu-item')}>
                                    <Link to={ACCOUNT_PATHS.ACCOUNT} className={cx('text-item')}>
                                        My Account
                                    </Link>
                                </li>
                                <li className={cx('menu-item')}>
                                    <span onClick={(e) => handleRedirectCheckout(e)} className={cx('text-item')}>
                                        Checkout
                                    </span>
                                </li>
                                <li className={cx('menu-item')}>
                                    <Link to={ROUTES_PATHS.WISHLIST} className={cx('text-item')}>
                                        Wishlish
                                    </Link>
                                </li>
                            </ul>
                        </Popover>
                    </div>
                );
            }}
        >
            {children}
        </Tippy>
    );
}

export default PopoverUser;

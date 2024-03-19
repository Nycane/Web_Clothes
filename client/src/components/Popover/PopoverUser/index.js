import Popover from '../Popover';
import Tippy from '@tippyjs/react/headless';
import {ROUTES_PATHS,ACCOUNT_PATHS} from '../../../constants';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import styles from './PopoverUser.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function PopoverUser({ children }) {
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
                                    <Link to={ROUTES_PATHS.CHECKOUT} className={cx('text-item')}>
                                        Checkout
                                    </Link>
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

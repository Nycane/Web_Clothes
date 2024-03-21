import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import { ROUTES_PATHS } from '../../../constants';
import cartSlice from '../../../redux/slice/cartSlice';
import { formatPrice } from '../../../utils/myUtils';
import Image from '../../Img';
import Popover from '../Popover';
import styles from './PopoverCart.module.scss';
// import { useState } from 'react';
const cx = classNames.bind(styles);
function PopoverCart({ visible, setVisible, children }) {
    const listProducts = useSelector((state) => state.cart.listProducts);
    const totalCart = useSelector((state) => state.cart.total);
    const dispatch = useDispatch();
    function handleRemove(index) {
        dispatch(cartSlice.actions.remove(index));
    }
    // const [visible, setVisible] = useState(false);
    return (
        <div>
            <Tippy
                visible={visible}
                delay={[0, 1000]}
                interactive={true}
                placement="top"
                // hideOnClick={false}
                onClickOutside={() => setVisible(false)}
                // trigger="click"
                // animation="scale"
                // appendTo={document.body}
                render={(attr) => {
                    return (
                        <div className={cx('cart-wrap')}>
                            <Popover>
                                <div className={cx('cart-scroll')}>
                                    <div className={cx('wrap-title')}>
                                        <FontAwesomeIcon
                                            className={cx('close-cart')}
                                            onClick={() => setVisible(false)}
                                            icon={faXmark}
                                        ></FontAwesomeIcon>
                                        <h1 className={cx('cart-title')}>Shopping Cart({listProducts.length})</h1>
                                    </div>
                                    {listProducts?.map((e, i) => {
                                        return (
                                            <div key={i} className={cx('cart-item')}>
                                                <div className={cx('cart-content')}>
                                                    <Link onClick={() => setVisible(false)} to={`/product/${e.id}`}>
                                                        <Image
                                                            className={cx('img')}
                                                            width="100%"
                                                            height="100%"
                                                            alt=""
                                                            src={e.image}
                                                        ></Image>
                                                    </Link>
                                                    <div className={cx('cart-info')}>
                                                        <Link
                                                            onClick={() => setVisible(false)}
                                                            to={`/product/${e.id}`}
                                                            className={cx('title')}
                                                        >
                                                            {e.name}
                                                        </Link>
                                                        {e?.variant?.length > 0 && (
                                                            <p className={cx('color-size')}>
                                                                {e.color} / {e.size}
                                                            </p>
                                                        )}
                                                        <p className={cx('quantity')}>Quantity:{e.quantity}</p>
                                                        <p className={cx('price')}>
                                                            Price:
                                                            {formatPrice.format(
                                                                e.price_discount > 0 ? e.price_discount : e.price,
                                                            )}
                                                        </p>
                                                        <span onClick={() => handleRemove(i)} className={cx('close')}>
                                                            X
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {listProducts?.length > 0 ? (
                                        <div className={cx('cart-total')}>
                                            <div className={cx('total')}>
                                                <p className={cx('total')}>Total</p>
                                                <p className={cx('price')}>{formatPrice.format(totalCart)}</p>
                                            </div>
                                            <div className={cx('options')}>
                                                <Link
                                                    onClick={() => setVisible(false)}
                                                    to={ROUTES_PATHS.CART}
                                                    className={cx('viewcart')}
                                                >
                                                    View Cart
                                                </Link>
                                                <Link
                                                    onClick={() => setVisible(false)}
                                                    to={ROUTES_PATHS.CHECKOUT}
                                                    className={cx('checkout')}
                                                >
                                                    Checkout
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ textAlign: 'center', paddingTop: '30px' }}>
                                            No products in the cart.
                                        </p>
                                    )}
                                </div>
                            </Popover>
                        </div>
                    );
                }}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default PopoverCart;

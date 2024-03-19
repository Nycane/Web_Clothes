import Tippy from '@tippyjs/react/headless';
import Image from '../../Img';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import Popover from '../Popover';
import { formatPrice } from '../../../utils/myUtils';
import styles from './PopoverLookBook.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function PopoverLookBook({ product, children }) {
    return (
        <Tippy
            hideOnClick={true}
            trigger="click"
            interactive={true}
            placement="top"
            appendTo={document.body}
            render={(attr) => {
                return (
                    <div className={cx('product-wrap')}>
                        <Popover>
                            <Link to={`/product/${product.id}`}>
                                <Image width="100%" height="auto" alt="" src={product.productImg}></Image>
                            </Link>
                            <div className={cx('product-content')}>
                                <Link to={`/product/${product.id}`} className={cx('title-product')}>
                                    {product.name}
                                </Link>
                                {product.price_discount > 0 ? (
                                    <p className={cx('price-product')}>
                                        <del className={cx('price-discount')}> {formatPrice.format(product.price_discount)}</del>
                                        <span className={cx('price')}>{ formatPrice.format(product.price)}</span>
                                    </p>
                                ) : (
                                    <p className={cx('price-product')}>{formatPrice.format(product.price)}</p>
                                )}
                            </div>
                        </Popover>
                    </div>
                );
            }}
        >
            {children}
        </Tippy>
    );
}

export default PopoverLookBook;

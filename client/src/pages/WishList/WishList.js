/* eslint-disable react-hooks/exhaustive-deps */
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    FacebookShareButton,
    InstapaperShareButton,
    PinterestIcon,
    PinterestShareButton,
    TwitterShareButton,
} from 'react-share';
import Image from '../../components/Img';
import { addToCart } from '../../redux/slice/cartSlice';
import { removeWishList } from '../../redux/slice/wishlistSLice';
import { formatDate, formatPrice } from '../../utils/myUtils';
import styles from './WishList.module.scss';
const cx = classNames.bind(styles);
function WishList() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.info);
    const wishLists = useSelector((state) => state.wishlist.listProducts);
    // Xóa sản phẩm
    function handleRemove(productId) {
        const newData = { productId, ...user };
        dispatch(removeWishList(newData));
    }
    // Thêm sản phẩm
    function handeAddToCart(product) {
        const newProduct = { "quantity": 1,...product};
        dispatch(addToCart(newProduct));
    }
    return (
        <Container style={{marginBottom:90}}>
            <Row>
                <Col lg={12} md={12}>
                    {wishLists?.length > 0 && (
                        <>
                            <table className={cx('wishlist-wrap')}>
                                {wishLists?.map((e, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td className={cx('wishlist-remove')}>
                                                    <div
                                                        onClick={() => handleRemove(e.id)}
                                                        className={cx('removeItem')}
                                                    >
                                                        x
                                                    </div>
                                                </td>
                                                <td className={cx('wishlist-img')}>
                                                    <Link  to={`/product/${e.id}`}>
                                                        <Image width="80px" height="auto" alt="" src={e.image}></Image>
                                                    </Link>
                                                </td>
                                                <td className={cx('wishlist-content')}>
                                                    <Link to={`/product/${e.id}`} className={cx('name')}>
                                                        {e.name}
                                                    </Link>
                                                    <p className={cx('price')}>{formatPrice.format(e.price)}</p>
                                                    <p className={cx('current-date')}>{formatDate(e.created_at)}</p>
                                                </td>
                                                {e?.variant?.length > 0 ? (
                                                    <td className={cx('wishlist-btn')}>
                                                        <Link to={`/product/${e.id}`} className={cx('btn-add')}>
                                                            Select Options
                                                        </Link>
                                                    </td>
                                                ) : (
                                                    <td className={cx('wishlist-btn')}>
                                                        <Link
                                                            onClick={() => handeAddToCart(e)}
                                                            className={cx('btn-add')}
                                                        >
                                                            Add to cart
                                                        </Link>
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    );
                                })}
                            </table>
                        </>
                    )}
                    {!wishLists.length > 0 && (
                        <p className={cx('wishlist-empty')}>There are no products on the Wishlist!</p>
                    )}
                    <div className={cx('list-icon')}>
                        <span className={cx('text-share')}>share on:</span>
                        <TwitterShareButton
                            media="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/12/banner-34.jpg"
                            url="https://mafoil.netlify.app/wishlist"
                        >
                            <FontAwesomeIcon className={cx('icon-social-tw')} icon={faTwitter}></FontAwesomeIcon>
                        </TwitterShareButton>
                        <FacebookShareButton
                            media="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/12/banner-34.jpg"
                            url="https://mafoil.netlify.app/wishlist"
                        >
                            <FontAwesomeIcon className={cx('icon-social-fb')} icon={faFacebookF}></FontAwesomeIcon>
                        </FacebookShareButton>
                        <PinterestShareButton
                            media="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/12/banner-34.jpg"
                            url="https://mafoil.netlify.app/wishlist"
                        >
                            <PinterestIcon className={cx('icon-social-db')}></PinterestIcon>
                        </PinterestShareButton>
                        <InstapaperShareButton
                            media="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/12/banner-34.jpg"
                            url="https://mafoil.netlify.app/wishlist"
                        >
                            <FontAwesomeIcon className={cx('icon-social-ins')} icon={faInstagram}></FontAwesomeIcon>
                        </InstapaperShareButton>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default WishList;

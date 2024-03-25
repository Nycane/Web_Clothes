import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBusinessTime, faMinus, faPlus, faStar, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconLoading from '../../../../components/Loading/IconLoading/IconLoading';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import Image from '../../../../components/Img';
import CustomModal from '../../../../components/Modal';
import Toast from '../../../../components/Toastify';
import { addToCart, buyNow } from '../../../../redux/slice/cartSlice';
import { getComments } from '../../../../redux/slice/userSlice';
import { addWishList } from '../../../../redux/slice/wishlistSLice';
import { formatPrice, objectIsEmpty } from '../../../../utils/myUtils';
import styles from './ProductInfo.module.scss';
const cx = classNames.bind(styles);
function ProductInfo({ product, customCss, showQuickView = true }) {
    const navigate = useNavigate();
    const isLoading = useSelector((state) => state.product.isLoading);
    const { listProducts: carts, isLoading: loadingAdd } = useSelector((state) => state.cart);
    const { countView: view, info: user} = useSelector((state) => state.user);
    const {isLoading:loadingWishList} = useSelector((state)=>state.wishlist)
    const [viewCurrent, setViewCurrent] = useState(31);
    const iconEyes = useRef(null);
    const [quantity, setQuantity] = useState(1);
    const [quantityOfProduct, setQuantityOfProduct] = useState(0);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const dispatch = useDispatch();
    // get color unique
    const uniqueColors = useMemo(() => {
        return product?.variant?.filter((e, i, arr) => arr.findIndex((temp) => temp.namecolor === e.namecolor) === i);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    // get size unique
    const uniqueSizes = useMemo(() => {
        return product?.variant?.filter((e, i, arr) => arr.findIndex((temp) => temp.namesize === e.namesize) === i);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    function totalProductQuantity() {
        const quantity = product?.variant?.reduce((i, e) => (i += e.quantity), 0);
        setQuantityOfProduct(quantity);
    }

    function handleBuyNow(product) {
        if (!color || !size) {
            Toast('warning', 'Please select size and color');
        } else {
            dispatch(buyNow({ quantity, color, size, ...product }));
            navigate('/checkout');
        }
    }

    function handleAdd(product) {
        // If the icon is showing, do not add it
        if(loadingAdd){
            return;
        }
        const productQuantityInCart = carts.find((e) => e.id === product.id && e.color === color && e.size === size);
        // console.log(productQuantityInCart);
        if (productQuantityInCart) {
            // check quantity stock
            const quantityStock = quantityOfProduct - productQuantityInCart.quantity;
            if (quantity > quantityStock) {
                Toast(
                    'warning',
                    `You cannot add that product to the cart — we have ${quantityOfProduct} in stock and you already have ${
                        quantityOfProduct - quantityStock
                    } in your cart.`,
                    5000,
                );
                return;
            }
        }
        if (product?.variant?.length > 0 && (!color || !size)) {
            Toast('warning', 'Please select size and color');
        } else {
            color && size
                ? dispatch(addToCart(Object.assign({ quantity, size, color }, product)))
                      .unwrap()
                      .then(() => {
                          setColor('');
                          setSize('');
                          setQuantity(1);
                      })
                : dispatch(addToCart(Object.assign({ quantity }, product)));
        }
    }

    function handleAddWishlist(product) {
        console.log(loadingWishList)
        if(loadingWishList){
            return
        }
        if (objectIsEmpty(user)) {
            Toast('warning', 'Please Login To Use Function');
            return;
        }
        const newData = { productId: product.id, ...user };
        dispatch(addWishList(newData));
    }

    function handleChangeQuantity(value) {
        const quantity = parseInt(value);
        setQuantity(quantity);
        if (quantity <= 0 || !quantity) return setQuantity(1);
        if (quantity >= quantityOfProduct) return setQuantity(quantityOfProduct);
        setQuantity(quantity);
    }
    function handleIncrement() {
        setQuantity((currentQuantity) => currentQuantity + 1);
    }

    function handleDecrement() {
        setQuantity((currentQuantity) => currentQuantity - 1);
    }

    function handleClear() {
        size !== '' && setSize('');
        color !== '' && setColor('');
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }
    function getAvailableSizes() {
        const sizes = product.variant.filter((e) => e.namecolor === color);
        return sizes;
    }
    function getAvailableColors() {
        const colors = product.variant.filter((e) => e.namesize === size);
        return colors;
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setViewCurrent(Math.round(Math.random() * 100));
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    // resert default , when redirect page
    useEffect(() => {
        if (product?.variant?.length > 0) {
            totalProductQuantity();
            setColor('');
            setSize('');
            setQuantity(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.id, product]);

    // check input quantity has biger than product quantiy
    useEffect(() => {
        if (color && size) {
            const index = product.variant.findIndex((e) => e.namecolor === color && e.namesize === size);
            const productQuantity = product.variant[index].quantity;
            setQuantityOfProduct(productQuantity);
            if (quantity > productQuantity) {
                setQuantity(productQuantity);
            }
        } else {
            totalProductQuantity();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color, size]);
    // GET
    useEffect(() => {
        product.id && dispatch(getComments({ productId: product.id, ...user }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.id]);
    return (
        <>
            {/* MOdal guide size */}
            <CustomModal
                modalIsOpen={modalIsOpen}
                isOpen={modalIsOpen}
                customCss={cx('custom-modal')}
                btnClosed
                onInCloseModal={closeModal}
            >
                <Image
                    width="100%"
                    height="auto"
                    src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/1sizeguide-clothes.webp"
                    alt="guide"
                ></Image>
            </CustomModal>
            {/* MOdal guide size */}

            <div className={cx('product-info')}>
                <h1
                    className={cx('title', {
                        isLoading: isLoading,
                    })}
                >
                    {product.name || 'Loading...'}
                </h1>
                <div
                    className={cx('rating', {
                        isLoading: isLoading,
                    })}
                >
                    {view?.totalRating && view?.countReView ? (
                        Array.from(Array(Math.floor(view.totalRating / view.countReView)), (_, index) => {
                            return (
                                <FontAwesomeIcon
                                    key={index}
                                    className={cx('icon-star')}
                                    icon={faStar}
                                ></FontAwesomeIcon>
                            );
                        })
                    ) : (
                        <>
                            <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                            <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                            <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                            <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                            <FontAwesomeIcon className={cx('icon-star')} icon={faStar}></FontAwesomeIcon>
                        </>
                    )}
                    <p className={cx('title-rating')}>({view?.countReView} customer review)</p>
                </div>
                {product.price_discount > 0 ? (
                    <div
                        className={cx('price', {
                            isLoading: isLoading,
                        })}
                    >
                        {product?.price ? (
                            <>
                                <strike className={cx('discount')}>{formatPrice.format(product.price)}</strike>
                                {formatPrice.format(product.price_discount)}
                            </>
                        ) : (
                            'Loading...'
                        )}
                    </div>
                ) : (
                    <div
                        className={cx('price', {
                            isLoading: isLoading,
                        })}
                    >
                        {(product.price && formatPrice.format(product.price)) || 'Loading...'}
                    </div>
                )}
                <div
                    className={cx('count-view', {
                        isLoading: isLoading,
                    })}
                >
                    <span ref={iconEyes}>
                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                    </span>
                    <span className={cx('title-view')}>{viewCurrent} people are viewing this right now</span>
                </div>
                <p
                    className={cx('description', {
                        isLoading: isLoading,
                    })}
                >
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur.
                </p>
                <div
                    className={cx('stock', {
                        isLoading: isLoading,
                    })}
                >
                    {quantityOfProduct === 0 ? (
                        <div
                            className={cx('out-of-stock', {
                                isLoading: isLoading,
                            })}
                        >
                            <p className={cx('text')}>out of stock</p>
                        </div>
                    ) : (
                        <div
                            className={cx('quantity-stock', {
                                isLoading: isLoading,
                            })}
                        >
                            <p className={cx('text-stock')}>
                                Only
                                <span style={{ color: 'red', margin: '0px 4px 0px' }}>{quantityOfProduct} item(s)</span>
                                left in stock!
                            </p>
                            <p className={cx('percent')}></p>
                        </div>
                    )}
                </div>
                {/* {product?.variant?.length > 0 && ( */}
                <div
                    className={cx('color-size-container', {
                        // isLoading: isLoading,
                    })}
                >
                    {/* color wrap */}
                    <div
                        className={cx('color-wrap', {
                            isLoading: isLoading,
                        })}
                    >
                        <p className={cx('color-title')}>
                            Color:<span className={cx('color-text')}>{color}</span>
                        </p>
                        <div className={cx('select-color')}>
                            {product?.variant?.length > 0
                                ? !size
                                    ? uniqueColors?.map((e, i) => {
                                          return (
                                              <Tippy key={i} animation="scale" content={e.namecolor}>
                                                  <div className={cx('color')}>
                                                      <div
                                                          onClick={() => setColor(e.namecolor)}
                                                          className={cx('color-code', {
                                                              active: e.namecolor === color,
                                                          })}
                                                          key={i}
                                                          style={{ background: e.code }}
                                                      ></div>
                                                  </div>
                                              </Tippy>
                                          );
                                      })
                                    : getAvailableColors().map((e, i) => {
                                          return (
                                              <Tippy key={i} animation="scale" content={e.namecolor}>
                                                  <div
                                                      className={cx('color', {
                                                          disabled: e.quantity === 0,
                                                      })}
                                                  >
                                                      <div
                                                          onClick={() => setColor(e.namecolor)}
                                                          className={cx('color-code', {
                                                              active: e.namecolor === color,
                                                              disabled: e.quantity === 0,
                                                          })}
                                                          key={i}
                                                          style={{ background: e.code }}
                                                      ></div>
                                                  </div>
                                              </Tippy>
                                          );
                                      })
                                : 'Loading...'}
                        </div>
                    </div>
                    {/* size wrap */}
                    <div
                        className={cx('size-wrap', {
                            isLoading: isLoading,
                        })}
                    >
                        <div className={cx('size-guide')}>
                            <p className={cx('size-title')}>
                                Size:<span className={cx('size-text')}>{size}</span>
                            </p>
                            <span className={cx('guide')} onClick={openModal}>
                                size guide
                            </span>
                        </div>
                        <div className={cx('select-size')}>
                            {product?.variant?.length > 0
                                ? !color
                                    ? uniqueSizes?.map((e, i) => {
                                          return (
                                              <Tippy key={i} animation="scale" content={e.namesize}>
                                                  <div className={cx('size', {})}>
                                                      <div
                                                          onClick={() => setSize(e.namesize)}
                                                          className={cx('size-name', {
                                                              active: e.namesize === size,
                                                          })}
                                                          key={i}
                                                      >
                                                          {e.namesize}
                                                      </div>
                                                  </div>
                                              </Tippy>
                                          );
                                      })
                                    : getAvailableSizes().map((e, i) => {
                                          return (
                                              <Tippy key={i} animation="scale" content={e.namesize}>
                                                  <div
                                                      className={cx('size', {
                                                          disabled: e.quantity === 0,
                                                      })}
                                                  >
                                                      <div
                                                          onClick={() => setSize(e.namesize)}
                                                          className={cx('size-name', {
                                                              active: e.namesize === size,
                                                              disabled: e.quantity === 0,
                                                          })}
                                                          key={i}
                                                      >
                                                          {e.namesize}
                                                      </div>
                                                  </div>
                                              </Tippy>
                                          );
                                      })
                                : 'Loading...'}
                        </div>
                    </div>
                    {(size || color) && (
                        <span
                            onClick={handleClear}
                            className={cx('color-size-clear', {
                                isLoading: isLoading,
                            })}
                        >
                            X Clear
                        </span>
                    )}
                </div>
                {/* product option */}
                <form className={cx('product-option')}>
                    <div
                        className={cx('btn-quantity', {
                            isLoading: isLoading,
                        })}
                    >
                        <button
                            disabled={quantity <= 1}
                            onClick={handleDecrement}
                            type="button"
                            className={cx('btn-left')}
                        >
                            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                        </button>
                        <input
                            onChange={(e) => handleChangeQuantity(e.target.value)}
                            min="1"
                            max={quantityOfProduct}
                            // step="1"
                            value={quantity}
                            className={cx('quantity')}
                            type="number"
                            disabled={quantityOfProduct === 0}
                        />
                        <button
                            disabled={quantity >= quantityOfProduct}
                            onClick={handleIncrement}
                            type="button"
                            className={cx('btn-right')}
                        >
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div
                        className={cx('add', {
                            disabled: quantityOfProduct === 0,
                        })}
                    >
                        <button
                            type="button"
                            onClick={() => handleAdd(product)}
                            className={cx('btn-add', {
                                isLoading: isLoading,
                                disabled: quantityOfProduct === 0,
                            })}
                        >
                            {loadingAdd ? <IconLoading customColor={'white'}></IconLoading> : 'add to cart'}
                        </button>
                    </div>
                    <div className={cx('wishlist')}>
                        <button
                            type="button"
                            onClick={() => handleAddWishlist(product)}
                            className={cx('btn-wishlist', {
                                isLoading: isLoading,
                                isActive : loadingWishList
                            })}
                        >
                        {loadingWishList ? <IconLoading></IconLoading>  :  <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>}
                        </button>
                    </div>
                    <div
                        className={cx('buynow', {
                            disabled: quantityOfProduct === 0,
                        })}
                    >
                        <button
                            type="button"
                            className={cx('btn-buynow', {
                                isLoading: isLoading,
                                disabled: quantityOfProduct === 0,
                            })}
                            onClick={() => handleBuyNow(product)}
                        >
                            buy now
                        </button>
                    </div>
                </form>

                <div
                    className={cx('safe-checkout', {
                        isLoading: isLoading,
                    })}
                >
                    <Image
                        className={cx('img', {
                            [customCss]: customCss,
                        })}
                        alt=""
                        src="https://res.cloudinary.com/djdsp9etg/image/upload/v1708529546/image/payments-2_chynwq.png"
                    ></Image>
                    <p className={cx('title-checkout')}>Guaranteed Safe Checkout</p>
                </div>

                <div className={cx('product-shipping')}>
                    <ul>
                        <li
                            className={cx('', {
                                isLoading: isLoading,
                            })}
                        >
                            <FontAwesomeIcon className={cx('icon-truck')} icon={faTruckFast}></FontAwesomeIcon>
                            <span
                                className={cx('text-shipping', {
                                    isLoading: isLoading,
                                })}
                            >
                                Free worldwide shipping on all orders over $100
                            </span>
                        </li>
                        <li
                            className={cx('', {
                                isLoading: isLoading,
                            })}
                        >
                            <FontAwesomeIcon className={cx('icon-business')} icon={faBusinessTime}></FontAwesomeIcon>
                            <span className={cx('text-shipping')}>Delivers in: 3-7 Working Days Shipping & Return</span>
                        </li>
                    </ul>
                </div>
                {showQuickView && (
                    <>
                        <div className={cx('product-meta')}>
                            <span
                                className={cx('sku', {
                                    isLoading: isLoading,
                                })}
                            >
                                sku : <span>{`SP00${product?.id}`}</span>
                            </span>
                            <span
                                className={cx('category', {
                                    isLoading: isLoading,
                                })}
                            >
                                category :{' '}
                                <Link to={`/shop/product-category/${product?.categoryName?.toLowerCase()}`}>
                                    {product?.categoryName}
                                </Link>
                            </span>
                            <span
                                className={cx('brand', {
                                    isLoading: isLoading,
                                })}
                            >
                                Brand :{' '}
                                <Link to={`/shop/product-brand/${product?.brandName?.toLowerCase()}`}>
                                    {product?.brandName}
                                </Link>
                            </span>
                            <span
                                className={cx('tag', {
                                    isLoading: isLoading,
                                })}
                            >
                                tags : {product?.price_discount > 0 ? <span>SALE</span> : <span>HOT</span>}
                            </span>
                        </div>
                        <div
                            className={cx('social-icon', {
                                isLoading: isLoading,
                            })}
                        >
                            <span className={cx('text')}>Share :</span>
                            <div className={cx('social-share')}>
                                <TwitterShareButton
                                    media="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/12/banner-34.jpg"
                                    url={`https://mafoil.netlify.app/product/${product?.id}`}
                                >
                                    <FontAwesomeIcon className={cx('tw-icon')} icon={faTwitter}></FontAwesomeIcon>
                                </TwitterShareButton>
                                <FacebookShareButton
                                    media="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2022/12/banner-34.jpg"
                                    url={`https://mafoil.netlify.app/product/${product?.id}`}
                                >
                                    <FontAwesomeIcon className={cx('fb-icon')} icon={faFacebookF}></FontAwesomeIcon>
                                </FacebookShareButton>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ProductInfo;

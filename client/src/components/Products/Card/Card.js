import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faLeftLong, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import ProductInfo from '../../../pages/ProductDetail/components/ProductInfo';
import { addToCart } from '../../../redux/slice/cartSlice';
import { addWishList } from '../../../redux/slice/wishlistSLice';
import { formatPrice, objectIsEmpty } from '../../../utils/myUtils';
import Image from '../../Img';
import CustomModal from '../../Modal';
import Toast from '../../Toastify';
import styles from './Card.module.scss';
const cx = classNames.bind(styles);
// const disabled = cx('disabled');
function Card({ closeModalSearch, isModalSearch, product, options = true, isLoading }) {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const user = useSelector((state) => state.user.info);
    // const isLoading = useSelector((state)=>state.product.isLoading)
    // const totalProductQuantity = useMemo(() => {
    //     // console.log("vo may lan")
    //     return product?.variant?.reduce((i, e) => {
    //         return (i += e.quantity);
    //     }, 0);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [product]);
    // console.log(totalProductQuantity);
    const totalProductQuantity = product?.variant?.reduce((i, e) => {
        return (i += e.quantity);
    }, 0);
    // close modal search when  page redirect
    function handleCloseModalSearch() {
        isModalSearch && closeModalSearch();
    }

    function handleAddProduct(product) {
        let newProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            price_discount: product.price_discount,
            image: product.image,
            variant: product.variant,
            quantity: 1,
        };
        dispatch(addToCart(newProduct));
    }

    function handleAddWishlish(product) {
        if (objectIsEmpty(user)) return Toast('warning', 'Please Login To Use Function');
        const newData = {
            productId: product.id,
            ...user,
        };
        dispatch(addWishList(newData));
    }

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }
    return (
        <>
            {/* Show Modal When Click Quickview*/}
            <CustomModal modalIsOpen={modalIsOpen} customCss={cx('custom-modal')} btnClosed onInCloseModal={closeModal}>
                <Container>
                    <Row>
                        <Col lg={6} md={6} style={{ padding: '0', zIndex: 200 }}>
                            <Image alt={product.name} src={product.image} width="100%"></Image>
                        </Col>
                        <Col lg={6} md={6} style={{ padding: '0' }} className={cx('product-detail-wrap')}>
                            <div className={cx('product-detail-modal')}>
                                <ProductInfo showQuickView={false} customCss={cx('custom-safe-checkout')} product={product}></ProductInfo>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </CustomModal>
            {/*  */}
            {
                <div className={cx('card')}>
                    <div
                        className={cx('card-body', {
                            isLoading: isLoading,
                        })}
                    >
                        <Image className={cx('img')} alt={product?.name} src={product?.image}></Image>
                        {options && (
                            <div className={cx('product-options')}>
                                {Object.keys(product)?.length > 0 && product?.variant?.length === 0 ? (
                                    <Tippy animation="scale" content="Add Cart">
                                        <span onClick={() => handleAddProduct(product)} className={cx('btn-cart')}>
                                            <FontAwesomeIcon
                                                className={cx('icon-cart')}
                                                icon={faCartShopping}
                                            ></FontAwesomeIcon>
                                        </span>
                                    </Tippy>
                                ) : (
                                    <Tippy animation="scale" content="Select Option">
                                        <Link
                                            onClick={handleCloseModalSearch}
                                            to={`/product/${product.id}`}
                                            className={cx('btn-cart')}
                                        >
                                            <FontAwesomeIcon
                                                className={cx('icon-cart')}
                                                icon={faLeftLong}
                                            ></FontAwesomeIcon>
                                        </Link>
                                    </Tippy>
                                )}
                                <Tippy animation="scale" content={<span>Wishlist</span>}>
                                    <span onClick={() => handleAddWishlish(product)} className={cx('btn-wishlist')}>
                                        <FontAwesomeIcon className={cx('icon-heart')} icon={faHeart}></FontAwesomeIcon>
                                    </span>
                                </Tippy>
                                <Tippy animation="scale" content="Quick View" visible={visible}>
                                    <span
                                        onMouseMove={() => {
                                            setVisible(true);
                                        }}
                                        onMouseLeave={() => {
                                            setVisible(false);
                                        }}
                                        onClick={openModal}
                                        className={cx('btn-quickview')}
                                    >
                                        <FontAwesomeIcon
                                            className={cx('icon-quickview')}
                                            icon={faMagnifyingGlass}
                                        ></FontAwesomeIcon>
                                    </span>
                                </Tippy>
                            </div>
                        )}
                        {product.price_discount > 0 ? (
                            <div
                                className={cx('product-sale', {
                                    isLoading: isLoading,
                                })}
                            >
                                Sale
                            </div>
                        ) : (
                            <div
                                className={cx('product-hot', {
                                    isLoading: isLoading,
                                })}
                            >
                                Hot
                            </div>
                        )}
                        {totalProductQuantity === 0 && (
                            <div
                                className={cx('product-out-of-stock', {
                                    isLoading: isLoading,
                                })}
                            >
                                out of stock
                            </div>
                        )}
                    </div>
                    <div className={cx('card-content')}>
                        <h3 className={cx('product-title')}>
                            <Link
                                onClick={handleCloseModalSearch}
                                className={cx('', {
                                    isLoading: isLoading,
                                })}
                                to={`/product/${product.id}`}
                            >
                                {product.name}
                            </Link>
                        </h3>
                        {product.price_discount > 0 ? (
                            <div className={cx('product-price', {})}>
                                <div
                                    className={cx('price', {
                                        isLoading: isLoading,
                                    })}
                                >
                                    <strike
                                        className={cx('discount', {
                                            isLoading: isLoading,
                                        })}
                                    >
                                        {formatPrice.format(product.price)}
                                    </strike>
                                    <span> {formatPrice.format(product.price_discount)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('product-price')}>
                                <div
                                    className={cx('price', {
                                        isLoading: isLoading,
                                    })}
                                >
                                    <span>{formatPrice.format(product.price)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
}

export default Card;

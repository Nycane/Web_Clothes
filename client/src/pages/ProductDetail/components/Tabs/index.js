import {
    faFaceAngry,
    faFaceGrinHearts,
    faFaceKissWinkHeart,
    faFaceSmile,
    faSmileWink,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import CustomModal from '../../../../components/Modal';
import Toast from '../../../../components/Toastify';
import { ROUTES_PATHS } from '../../../../constants';
import { commentUser, deleteComment } from '../../../../redux/slice/userSlice';
import { scrollViewToPoint } from '../../../../utils/myUtils';
import Review from './Review';
import Star from './Star';
import styles from './Tabs.module.scss';
const cx = classNames.bind(styles);
function Tabs({productId}) {
    const dispatch = useDispatch();
    // const { id: productId } = useParams();
    const [toggle, setToggle] = useState(1);
    const [star, setStar] = useState(0);
    const [isStar, setiStar] = useState(false);
    const [storageStar, setStorageStar] = useState();
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.user.info);
    const listComments = useSelector((state) => state.user.listComments);
    const view = useSelector((state) => state.user?.countView);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const scrollPosition= useRef(null);
    // Mở modal comment
    function openModal() {
        setModalIsOpen(true);
    }
    // Đóng modal commnet
    function closeModal() {
        setModalIsOpen(false);
    }
    // Handle Rating
    function handleStar(value) {
        setStar(value);
        setStorageStar(value);
        setiStar(true);
    }
    function handleMoveStar() {
        !isStar ? setStar(0) : setStar(storageStar);
    }
    // --------------------

    // Kiểm tra và gửi comment
    function handleSubmit() {
        if (!isStar) {
            Toast('error', 'Please Select Rating');
            return;
        }
        if (!comment.trim()) {
            Toast('error', 'Please Enter A Review');
            return;
        }
        setiStar(false);
        setStar(0);
        setComment('');
        // request Comment and add Comment
        dispatch(
            commentUser({
                productId,
                ...user,
                "content": comment.trim(),
                "rating": star,
            }),
        );
    }
    // remove comment
    function handleDeleteComment(id) {
        const isDelete = window.confirm('Are you sure to delete?');
        isDelete && dispatch(deleteComment({productId, commentId: id,...user}));
        scrollViewToPoint(scrollPosition)
    }
    // Get comments
    useEffect(() => {
        // console.log("productId>>>",productId)
        // productId && dispatch(getComments({productId,...user}));
        setToggle(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);
    return (
        <>
            <CustomModal
                modalIsOpen={modalIsOpen}
                isOpen={modalIsOpen}
                customCss={cx({ 'custom-modal': modalIsOpen })}
                btnClosed
                onInCloseModal={closeModal}
            >
                <Container>
                    <Row>
                        <Col lg={12} md={12}>
                            {user?.id ? (
                                <div className={cx('comment-wrap')}>
                                    <h5 className={cx('comment-title')}> add a review</h5>
                                    <div className={cx('comment-rating')}>
                                        <p className={cx('rating-title')}>Your rating</p>
                                        <div className={cx('list-star')}>
                                            <Star
                                                onInHandleMoveStar={handleMoveStar}
                                                onInHandleStar={handleStar}
                                                Tippy={Tippy}
                                                iconFaceAngry={
                                                    <FontAwesomeIcon
                                                        // style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faFaceAngry}
                                                    ></FontAwesomeIcon>
                                                }
                                                iconFaceGrinHearts={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faFaceGrinHearts}
                                                    ></FontAwesomeIcon>
                                                }
                                                iconFaceKissWinkHeart={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faFaceKissWinkHeart}
                                                    ></FontAwesomeIcon>
                                                }
                                                iconFaceSmile={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faFaceSmile}
                                                    ></FontAwesomeIcon>
                                                }
                                                iconSmileWink={
                                                    <FontAwesomeIcon
                                                        style={{ color: 'white', fontSize: '20px' }}
                                                        icon={faSmileWink}
                                                    ></FontAwesomeIcon>
                                                }
                                                iconStar={<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>}
                                                cx={cx}
                                                setStar={setStar}
                                                star={star}
                                            ></Star>
                                        </div>
                                    </div>
                                    <textarea
                                        className={cx('comment-content')}
                                        placeholder="Your Reviews *"
                                        cols={45}
                                        rows={8}
                                        value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                        }}
                                        maxLength={500}
                                    ></textarea>
                                    <button onClick={handleSubmit} className={cx('btn-submit')}>
                                        submit
                                    </button>
                                </div>
                            ) : (
                                <div className={cx('please-login')}>
                                    <h1 className={cx('title-redirect')}>Please Login To Comment</h1>
                                    <Link to={ROUTES_PATHS.LOGIN} className={cx('btn-redirect')}>
                                        login
                                    </Link>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </CustomModal>
            <Container>
                <Row>
                    <Col lg={12} md={12}>
                        <div className={cx('tabs')}>
                            <div
                                onClick={() => {
                                    setToggle(1);
                                }}
                                className={cx('tabs-title', {
                                    'active-tabs': toggle === 1,
                                })}
                            >
                                DESCRIPTION
                            </div>
                            <div
                                onClick={() => {
                                    setToggle(2);
                                }}
                                className={cx('tabs-title', {
                                    'active-tabs': toggle === 2,
                                })}
                            >
                                REVIEWS ({view?.countReView})
                            </div>
                        </div>
                        <div className={cx('tabs-content')}>
                            <div
                                className={cx('content', {
                                    'active-content': toggle === 1,
                                })}
                            >
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum.
                                </p>
                            </div>
                            <div
                                className={cx('content', {
                                    'active-content': toggle === 2,
                                })}
                            >
                                <div className={cx('review')}>
                                    <h2 ref={scrollPosition} className={cx('review-title')}>
                                        {view?.countReView} review for Corduroy Slim Flared Pants
                                    </h2>
                                    <div className={cx('review-scroll')}>
                                        {listComments?.length > 0 && (
                                            <Review
                                                Tippy={Tippy}
                                                scrollPosition={scrollPosition}
                                                listComments={listComments}
                                                productId={productId}
                                                user={user}
                                                onInDeleteComment={handleDeleteComment}
                                                iconStar={<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>}
                                            />
                                        )}
                                    </div>
                                    <button onClick={openModal} type="button" className={cx('btn-modal-comment')}>
                                        write a review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Tabs;

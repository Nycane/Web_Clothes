/* eslint-disable react-hooks/exhaustive-deps */
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import useDebounce from '../../../../components/Hook/useDebounce';
import CustomModal from '../../../../components/Modal/Modal';
import PaginateCustom from '../../../../components/PaginateCustom';
import Card from '../../../../components/Products/Card';
import shopSlice, { filterProducts, getVariantProducts } from '../../../../redux/slice/shopSlice';
import { scrollViewToPoint } from '../../../../utils/myUtils';
import styles from './Layout.module.scss';
import Listselect from './components/ListSelect';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import FilterDropDown from './components/Topbar/FilterDropDown';
const cx = classNames.bind(styles);
function Layout({ param = '' }) {
    const dispatch = useDispatch();
    // Get products
    const {
        isLoading,
        layout,
        sort,
        items: listProduct,
        pageNumber,
        isPriceUpdate,
        selectBrand,
        selectCategory,
    } = useSelector((state) => state.shop);
    const [loading, setLoading] = useState(true);
    const [isFetch, setIsFetch] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const scrollPosition = useRef(null);

    // Paganation
    let itemsPerPage = layout === 3 ? 8 : 6;

    const pagesVisited = pageNumber * itemsPerPage;

    const pageCount = Math.ceil(listProduct?.length / itemsPerPage);

    function scrollToTop() {
        scrollViewToPoint(scrollPosition);
    }
    // handle modal sidebar , mode tablet-mobile
    function handleOpenModal() {
        setIsModal(true);
    }

    function handleCloseModal() {
        setIsModal(false);
    }

    const handleChangePage = ({ selected }) => {
        // setPageNumber(selected);
        dispatch(shopSlice.actions.setPageNumber(selected));
        scrollToTop();
    };

    const handleChangLayout = useCallback((layout) => {
        handleChangePage({ selected: 0 });
        // setLayout(layout);
        dispatch(shopSlice.actions.setLayout(layout));
    });

    // Delay thời gian lấy gía và gửi lên sever
    const { selectColors, selectSizes, minPrice, maxPrice } = useDebounce(
        300,
        useSelector((state) => state.shop),
    );

    // Lọc sản phẩm theo giá
    const handleChangePrice = useCallback((newValue) => {
        dispatch(shopSlice.actions.setPrice(newValue));
        // dispatch(shopSlice.actions.setValuePrice(newValue));
    }, []);

    const handleAfterChangePrice = () => {
        // Xử lý logic khi người dùng thả chuột ra
        scrollToTop();
    };

    // Lọc theo size
    const handleSelectSize = useCallback((name) => {
        dispatch(shopSlice.actions.setSize(name));
        scrollToTop();
    }, []);

    // Lọc theo màu
    const handleSelectColor = useCallback((name) => {
        dispatch(shopSlice.actions.setColor(name));
        scrollToTop();
    }, []);

    // Sắp xếp sản phẩm theo giá
    const handleSort = useCallback((value) => {
        dispatch(shopSlice.actions.setSort(value));
        scrollToTop();
    });

    // Xóa tất cả bộ lọc
    const handleClearAll = useCallback(() => {
        dispatch(shopSlice.actions.clearAll());
        scrollToTop();
    });
    // Xóa lọc theo giá
    const handleResetPrice = useCallback(() => {
        dispatch(shopSlice.actions.resetPrice());
        // setValue([1000000, 10000000]);
        scrollToTop();
    });
    // get property image

    // loading
    useEffect(() => {
        let timer;
        if (!isLoading) {
            setLoading(true);
            timer = setTimeout(() => {
                setIsFetch(true);
                setLoading(false);
            }, 1500); // Thời gian chờ là 3000 mili giây, tức là 3 giây
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isLoading, layout, pageNumber]);

    // Lấy variant sản phẩm theo bộ lọc
    useEffect(() => {
        if (param) {
            dispatch(getVariantProducts(param));
        } else {
            dispatch(getVariantProducts());
        }
    }, [param]);

    // Filter sản phẩm
    useEffect(() => {
        if (isPriceUpdate) {
            dispatch(filterProducts());
            dispatch(shopSlice.actions.setPageNumber(0));
        }
    }, [selectColors, selectSizes, minPrice, maxPrice, selectBrand, selectCategory, sort]);
    return (
        <Container fluid style={{ marginBottom: 90 }}>
            <Row>
                <Col lg={3} md={12}>
                    {/* Side bar , hidden when in tablet-mobile mode */}
                    <div className={cx('sidebar-pc')}>
                        <Sidebar
                            param={param}
                            onInSelectColor={handleSelectColor}
                            onInSelectSize={handleSelectSize}
                            selectColors={selectColors}
                            selectSizes={selectSizes}
                            onInChangePrice={handleChangePrice}
                            onInAfterChangePrice={handleAfterChangePrice}
                        ></Sidebar>
                    </div>
                </Col>
                <Col lg={9} md={12}>
                    {/* Top bar */}
                    <div className={cx('scroll-position')} ref={scrollPosition}></div>

                    {/* responsive tablet - mobile */}
                    <CustomModal
                        modalIsOpen={isModal}
                        customCss={cx('custom-modal')}
                        onInCloseModal={handleCloseModal}
                        btnClosed={true}
                        customBtnClose={cx('custom-btn-close')}
                    >
                        <div className={cx('sidebar-tablet-mobile')}>
                            <Sidebar
                                param={param}
                                onInSelectColor={handleSelectColor}
                                onInSelectSize={handleSelectSize}
                                selectColors={selectColors}
                                selectSizes={selectSizes}
                                onInChangePrice={handleChangePrice}
                                onInAfterChangePrice={handleAfterChangePrice}
                            ></Sidebar>
                        </div>
                    </CustomModal>
                    {/* filter display table-mobile */}
                    <div className={cx('container-filter-tb')}>
                        <div onClick={handleOpenModal} className={cx('toogle')}>
                            <FontAwesomeIcon icon={faSliders}></FontAwesomeIcon>
                        </div>
                        <FilterDropDown onInSort={handleSort}></FilterDropDown>
                    </div>

                    <Topbar onInSort={handleSort} onInChangeLayout={handleChangLayout} layout={layout}></Topbar>

                    <Row>
                        <Col lg={12} md={12}>
                            {/* List filter select */}
                            <Listselect
                                onInResetPrice={handleResetPrice}
                                onInSelectColor={handleSelectColor}
                                onInSelectSize={handleSelectSize}
                                onInClearAll={handleClearAll}
                                selectColors={selectColors}
                                selectSizes={selectSizes}
                            ></Listselect>
                        </Col>
                    </Row>
                    <Row>
                        {listProduct?.slice(pagesVisited, pagesVisited + itemsPerPage).map((e, i) => {
                            return (
                                <Col key={i} lg={layout} md={6} sm={6} xs={6}>
                                    <Card isLoading={loading} product={e}></Card>
                                </Col>
                            );
                        })}
                        {listProduct?.length === 0 && isFetch && (
                            <h1 style={{ textAlign: 'center', color: '#666' }}>No Products</h1>
                        )}
                        {/* Paganation */}
                        <Row>
                            <Col>
                                {pageCount > 1 && !loading && (
                                    <>
                                        <PaginateCustom
                                            pageCount={pageCount}
                                            forcePage={pageNumber}
                                            onInChangePage={handleChangePage}
                                            leftNavigation="<"
                                            rightNavigation=">"
                                        />
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Layout;

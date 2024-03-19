import productApi from '../../../../../apis/productApi';
import Card from '../../../../../components/Products/Card';
import useDebounce from '../../../../../components/Hook/useDebounce';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Search({ onInCloseModal, isModalSearch }) {
    const [search, setSearch] = useState('');
    const inputRef = useRef();
    let beforeValue = useRef("");
    const [productSearch, setProductSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let searchDebounce = useDebounce(500, search);
    // Làm chậm thời gian gửi kết quả lên api
    useEffect(() => {
        if (!searchDebounce.trim() && !search) {
            setProductSearch([]);
            setIsLoading(false);
            return;
        }
        const searchProduct = async () => {
            let result = await productApi.searchProduct(searchDebounce);
            setProductSearch(result.data);
            setIsLoading(false);
        };
        searchProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDebounce]);
    // Lấy giá trị tìm kiếm
    function handleSearch(keyword) {
        if (beforeValue.current === keyword) return;
        if (!keyword.startsWith(' ')) {
            beforeValue.current = keyword;
            setSearch(keyword);
            setIsLoading(true);
        }
        return;
    }
    // Xóa giá trị tìm kiếm
    function handleClose() {
        setSearch('');
        beforeValue.current = '';
        setProductSearch([]);
        setIsLoading(false); // Đặt trạng thái tìm kiếm thành false
        inputRef.current.focus();
    }
    return (
        <Container fluid>
            <Row>
                <Col lg={12} md={12}>
                    <div className={cx('search-wrap')}>
                        <h2 className={cx('search-title')}>What are you looking for?</h2>
                        <div className={cx('form-search')}>
                            <input
                                ref={inputRef}
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search..."
                                className={cx('search-input')}
                            ></input>
                            {search && !isLoading && (
                                <div onClick={() => handleClose()}>
                                    <FontAwesomeIcon className={cx('close-icon')} icon={faClose} />
                                </div>
                            )}
                            {isLoading && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className={cx('result-search-wrap')}>
                {productSearch.length > 0 &&
                    productSearch.map((e, i) => {
                        return (
                            <Col key={i} lg={3} md={4} sm={6}>
                                <Card
                                    isModalSearch={isModalSearch}
                                    closeModalSearch={onInCloseModal}
                                    options={false}
                                    product={e}
                                ></Card>
                            </Col>
                        );
                    })}
                <Col lg={12} md={12}>
                    {!isLoading && search.length > 0 && productSearch.length === 0 && (
                        <h1 className={cx('no-result')}>No Result</h1>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
export default Search;

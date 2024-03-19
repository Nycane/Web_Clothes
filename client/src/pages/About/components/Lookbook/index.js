import PopoverLookBook from '../../../../components/Popover/PopoverLookBook';
import SliderCustom from '../../../../components/Slider/SliderCustom';
import Image from '../../../../components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getLookBooks } from '../../../../redux/slice/productSlice';
import styles from './LookBook.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function LookBook() {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const lookBooks = useSelector((state)=>state.product.lookBooks)
    const customResponsive = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ];
    useEffect(() => {
        dispatch(getLookBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return (
        <>
            <Container fluid>
                <Row>
                    <Col style={{ padding: 0 }}>
                        <SliderCustom customCss={cx('custom-css')} customResponsive={customResponsive}>
                            {lookBooks.map((e, i) => {
                                return (
                                    <div key={i} className={cx('img-popover')}>
                                        <Image style={{ width: '100%', height: '100%' }} alt="" src={e.lookBookImg}></Image>
                                        <div className={cx('item-lookbook')}>
                                            <PopoverLookBook product={e} visible={visible}>
                                                <div className={cx('number-lookbook')}>
                                                    <FontAwesomeIcon
                                                        onClick={() => setVisible(true)}
                                                        className={cx('icon-lookbook')}
                                                        icon={faPlus}
                                                    ></FontAwesomeIcon>
                                                </div>
                                            </PopoverLookBook>
                                        </div>
                                    </div>
                                );
                            })}
                        </SliderCustom>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LookBook;

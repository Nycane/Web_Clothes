import CustomModal from '../../../../components/Modal';
import Image from '../../../../components/Img';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './BannerVideo.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function BannerVideo({ img }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <Container style={{ marginBottom: '100px' }}>
            <Row>
                <Col lg={6} md={6} sm={12}>
                    {/* Modal */}
                    <CustomModal customCss={cx('custom-modal')} modalIsOpen={modalIsOpen} onInCloseModal={closeModal} btnClosed={false}>
                        <iframe
                            width="100%"
                            height="100%"
                            controls
                            src="https://www.youtube.com/embed/yekdy9NZCdw"
                            title="Women’s Fall-Winter 2022 Fashion Show | LOUIS VUITTON"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </CustomModal>
                    {/*  */}
                    <div className={cx('banner-video')}>
                        <Image className={cx('img-banner')} src={img} alt=""></Image>
                        <div className={cx('content-video-wrap')} onClick={openModal}>
                            <div className={cx('icon-box')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faPlay}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={6} md={6} sm={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className={cx('content-wrap')}>
                        <p className={cx('title-small')}>SPECIAL FASHION</p>
                        <h2 className={cx('title-default')}>WHO WE ARE?</h2>
                        <p className={cx('text',"mb-15")}>
                            Fusce blandit, leo eu pellentesque convallis, velit neque porttitor dui, a tristique ipsum
                            lacus ut leo. Integer congue risus ac tristique porttitor. In erat justo, luctus mattis
                            vestibulum sed, rhoncus et justo
                        </p>
                        <p className={cx('text')}>
                            Curabitur hendrerit arcu a ante egestas, nec dignissim sem maximus. Nunc eu purus at odio
                            commodo lobortis a nec augue. Maecenas bibendum, erat sed mollis tempor, odio est ornare
                            lorem, non convallis neque ligula vitae dui.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default BannerVideo;

import { faBoxOpen, faHandHoldingDollar, faTags } from '@fortawesome/free-solid-svg-icons';
import { faDribbble, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BRAND_IMGS, ABOUT_IMG } from '../../constants';
import Image from '../../components/Img';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import BannerCustom from '../../components/Banner/BannerCustom';
import SliderCustom from '../../components/Slider/SliderCustom';
import BannerVideo from './components/BannerVideo';
import LookBook from './components/Lookbook';
import OurTeam from './components/OurTeam';
import styles from './About.module.scss';
const cx = classNames.bind(styles);
function About() {
    const customResponsive = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 2,
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
    const teamMembers = [
        {
            socialIcons: [
                <FontAwesomeIcon className={cx('icon')} icon={faTwitter}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faFacebookF}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faDribbble}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faInstagram}></FontAwesomeIcon>,
            ],
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor ac magnahendrerit, ut suscipit elit pharetra.',
            name: 'Robert Smith',
            job: 'CEO',
            avatarSrc: ABOUT_IMG.OUR_TEAM[0].imgSrc,
        },
        {
            socialIcons: [
                <FontAwesomeIcon className={cx('icon')} icon={faTwitter}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faFacebookF}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faDribbble}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faInstagram}></FontAwesomeIcon>,
            ],
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor ac magnahendrerit, ut suscipit elit pharetra.',
            name: 'Crystel Casper',
            job: 'CEO',
            avatarSrc: ABOUT_IMG.OUR_TEAM[1].imgSrc,
        },
        {
            socialIcons: [
                <FontAwesomeIcon className={cx('icon')} icon={faTwitter}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faFacebookF}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faDribbble}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faInstagram}></FontAwesomeIcon>,
            ],
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor ac magnahendrerit, ut suscipit elit pharetra.',
            name: 'Haleigh Walter',
            job: 'Designer',
            avatarSrc: ABOUT_IMG.OUR_TEAM[2].imgSrc,
        },
        {
            socialIcons: [
                <FontAwesomeIcon className={cx('icon')} icon={faTwitter}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faFacebookF}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faDribbble}></FontAwesomeIcon>,
                <FontAwesomeIcon className={cx('icon')} icon={faInstagram}></FontAwesomeIcon>,
            ],
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor tortor ac magnahendrerit, ut suscipit elit pharetra.',
            name: 'Kaya Luettgen',
            job: 'Designer',
            avatarSrc: ABOUT_IMG.OUR_TEAM[3].imgSrc,
        },
    ];
    return (
        <>
            <BannerVideo img={ABOUT_IMG.BANNER_VIDEO.imgSrc}></BannerVideo>
            {/* ------------------------------ */}
            <Container style={{ marginBottom: '50px' }}>
                <Row className={cx('icon-text-box')}>
                    <Col lg={4} md={4} sm={4}>
                        <div className={cx('icon-text-wrap')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faBoxOpen}></FontAwesomeIcon>
                            <span className={cx('text')}>Free In - App Shipping</span>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                        <div className={cx('icon-text-wrap')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faTags}></FontAwesomeIcon>
                            <span className={cx('text')}> Students get 20% off</span>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={4}>
                        <div className={cx('icon-text-wrap')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faHandHoldingDollar}></FontAwesomeIcon>
                            <span className={cx('text')}>Shop styles, Earn points </span>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/* ------------------------------ */}
            <OurTeam teamData={teamMembers}></OurTeam>

            {/* ----------------------- */}
            <BannerCustom
                customImg = {cx('custom-img')}
                customText = {cx('custom-text')}
                customTitle = {cx('custom-title')}
                customContent = {cx('custom-content')}
                right
                img={ABOUT_IMG.BANNER_CUSTOM.imgSrc}
                title={ABOUT_IMG.BANNER_CUSTOM.title}
                text={ABOUT_IMG.BANNER_CUSTOM.text}
            ></BannerCustom>
            {/* ----------------------- */}

            {/* ------------------------- */}
            <SliderCustom margin border padding customResponsive={customResponsive} customCss={cx('custom-css')}>
                {BRAND_IMGS.map((e, i) => {
                    return <Image key={i} className={cx('img-brand')} alt="brand" src={e.imgSrc}></Image>;
                })}
            </SliderCustom>
            {/* --------------------------- */}
            <LookBook></LookBook>
            {/* ------------------------- */}
        </>
    );
}

export default About;

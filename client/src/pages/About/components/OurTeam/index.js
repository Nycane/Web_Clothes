import Image from '../../../../components/Img';
import { Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './OurTeam.module.scss';
import { ABOUT_IMG } from '../../../../constants';
import SliderCustom from '../../../../components/Slider/SliderCustom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
function OurTeam({ teamData }) {
    const customResponsive =[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
      ]
    return (
        <Container fluid style={{ margin: '90px 0px' }}>
            <Row>
                <Col lg={4} md={4} style={{ padding: 0 }}>
                    <Image className={cx('banner-img')} alt="img" src={ABOUT_IMG.BANNER.imgSrc} width="100%" height="100%"></Image>
                </Col>
                <Col lg={8} md={8}>
                    <div className={cx('ourteam-wrap')}>
                    <h1 className={cx('title')}>our teams</h1>
                    {/* slider */}
                        <SliderCustom  slShow={2} countScroll={2} dots={true} customResponsive={customResponsive} customCss={cx('custom-css')} >
                            {teamData?.map((e, i) => {
                                return (
                                    <div key={i} className={cx('ourteam-item')}>
                                        <div className={cx('icon-social')}>
                                            {e.socialIcons.map((e, i) => {
                                                return (
                                                    <span className={cx('icon')} key={i}>
                                                        {e}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                        <div className={cx('text')}>{e.bio}</div>
                                        <div className={cx('info')}>
                                            <Image className={cx('img')} alt="" src={e.avatarSrc}></Image>
                                            <div className={cx('info-content')}>
                                                <p className={cx('info-name')}>{e.name}</p>
                                                <p className={cx('info-job')}>{e.job} </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </SliderCustom>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default OurTeam;

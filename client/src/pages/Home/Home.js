import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerCustom from '../../components/Banner/BannerCustom';
import Image from '../../components/Img';
import SliderCustom from '../../components/Slider/SliderCustom';
import SliderProducts from '../../components/Slider/SliderProducts';
import { BRAND_IMGS, HOME_IMG } from '../../constants';
import { getBestSellers, getTrendings } from '../../redux/slice/productSlice';
import styles from './Home.module.scss';
import Banner1 from './components/Banner1';
import Banner2 from './components/Banner2';
import BannerScroll from './components/BannerScroll/index.';
import SliderFeedback from './components/SliderFeedback';
const cx = classNames.bind(styles);
function Home() {
    const productBestSellers = useSelector((state)=>state.product.listBestSeller)
    const productBestTrendings = useSelector((state)=>state.product.listTrendings)
    const customResponsive = [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBestSellers());
        dispatch(getTrendings())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Banner1  listImg={HOME_IMG.BANNER_SALE1}></Banner1>
            <SliderProducts products={productBestSellers} title="BEST SELLER" slShow={5} text="view all"></SliderProducts>
            <BannerCustom
                left
                img={HOME_IMG.BANNER_CUSTOM.imgSrc}
                title={HOME_IMG.BANNER_CUSTOM.title}
                text={HOME_IMG.BANNER_CUSTOM.text}
                btn
            ></BannerCustom>
            <SliderFeedback></SliderFeedback>
            <SliderProducts
                products={productBestTrendings}
                title="TRENDING PRODUCT"
                slShow={4}
                text="view all"
            ></SliderProducts>
            <SliderCustom customResponsive={customResponsive}  border padding>
                {BRAND_IMGS.map((e, i) => {
                    return (
                            <Image key={i} className={cx('img')} alt="brand" src={e.imgSrc}></Image>
                    );
                })}
            </SliderCustom>
            <BannerScroll ></BannerScroll>
            <Banner2  listImg={HOME_IMG.BANNER_SALE2}></Banner2>
        </>
    );
}

export default Home;

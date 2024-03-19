import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import {ROUTES_PATHS} from '../../constants';
import Header from '../components/Header';
import styles from './HeaderBannerLayout.module.scss';
const cx = classNames.bind(styles)
function HeaderBannerLayout({ children}) {
    const location = useLocation();
    let pathName=location.pathname.split('/')
    const notIncludes=["product-category","product-brand","lost-password"]
    const breadCrumbs = pathName.filter(e=>e!=="" && !notIncludes.includes(e) && !Number(e))
    let LocationBasedBreadcrumbs=breadCrumbs[0]
    let currentPath = ""
    breadCrumbs.forEach((e)=>{
        currentPath+= " > "+ e.charAt(0).toLocaleUpperCase()+e.slice(1);
    })
    const linkItems = currentPath.trim().split(' ')
    return (
        <>
            <Header bg={true}></Header>
           { pathName[1]!=="about"
                    ?
            <div className={cx('wrap')}>
                <div className={cx('background')}>
                    <div className={cx('content')}>
                        <h2 className={cx('title')}>{LocationBasedBreadcrumbs}</h2>
                        <div className={cx('title-page')}>
                            <Link to={ROUTES_PATHS.HOME}className={cx('before')}>
                                Home
                            </Link>
                            {/* <FontAwesomeIcon className={cx('icon')} icon={faChevronRight }></FontAwesomeIcon> */}
                            {linkItems.map((e,i)=>{
                               return  e===">" ?
                                    <span className={cx('greater-than')} key={i}>{e}</span>
                                :
                                   <Link to={`/${e}`} key={i} className={cx('current',{
                                    isClick:i!==linkItems.length-1
                                   })}>{decodeURIComponent(e)}</Link>
                                
                            })}
                        </div>
                    </div>
                </div>
            </div>
                    :
            <div className={cx('img-bg')}>
                <h3 className={cx('img-title')}>About us</h3>
            </div>}
            {children}
            <Footer></Footer>
        </>
    );
}

export default HeaderBannerLayout;

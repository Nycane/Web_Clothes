import { Link } from 'react-router-dom';
import {SHOP_PATHS} from '../../../../../../constants';
import styles from './ContentSlider.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function SliderContent({ titleSmall = 'sale up to 60% of', titleLarge = 'black friday sale' }) {
    return (
        <div className={cx('content-wrap')}>
                <h6 className={cx('title-small')}>{titleSmall}</h6>
                <h5 className={cx('title-large')}>{titleLarge}</h5>
            <Link to={SHOP_PATHS.SHOP} className={cx('btn')}>
                <span className={cx('text-btn')} style={{ zIndex: 9 }}>shop now</span>
            </Link>
        </div>
    );
}

export default SliderContent;

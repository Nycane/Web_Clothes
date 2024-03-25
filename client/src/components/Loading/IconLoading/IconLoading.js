import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './IconLoading.module.scss';
const cx = classNames.bind(styles);
function IconLoading({customCss,customColor=null}) {
    return (
        <>
            <FontAwesomeIcon style={{color:customColor}} className={cx('loading-icon',{
                [customCss]:customCss
            })} icon={faSpinner} />
        </>
    );
}

export default IconLoading;

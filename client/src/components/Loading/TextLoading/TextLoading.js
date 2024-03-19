import styles from './TextLoading.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function TextLoading() {
    return (  
      <div className={cx("loading-wrap")}>
            <h1 className={cx('colored-text-skeleton')}>
                MAFOIL...
            </h1>
      </div>
    );
}

export default TextLoading;
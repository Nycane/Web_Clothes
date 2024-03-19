import {formatPrice} from "../../../../../../utils/myUtils";
import classNames from "classnames/bind";
import styles from './Listselect.module.scss';
import { memo } from "react";
const cx = classNames.bind(styles);
function Listselect({onInResetPrice,min_price,max_price,selectColors,onInSelectColor,selectSizes,onInSelectSize,onInClearAll}) {
    return (  
        <div className={cx('list-select')}>
        {(min_price !== 1000000 || max_price !== 10000000) && (
            <span onClick={() => onInResetPrice()} className={cx('item-select')}>
                {formatPrice.format(min_price)} - {formatPrice.format(max_price)} x
            </span>
        )}
        {selectColors?.length > 0 &&
            selectColors?.map((e, i) => {
                return (
                    <span
                        key={i}
                        onClick={() => onInSelectColor(e)}
                        className={cx('item-select')}
                    >
                        {e} x
                    </span>
                );
            })}
        {selectSizes?.length > 0 &&
            selectSizes?.map((e, i) => {
                return (
                    <span
                        key={i}
                        onClick={() => onInSelectSize(e)}
                        className={cx('item-select')}
                    >
                        {e} x
                    </span>
                );
            })}
        {(min_price !== 1000000 ||
            max_price !== 10000000 ||
            selectColors?.length > 0 ||
            selectSizes?.length > 0) && (
            <div onClick={() => onInClearAll()} className={cx('clear-all')}>
                Clear All
            </div>
        )}
    </div>
    );
}

export default memo(Listselect);
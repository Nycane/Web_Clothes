import {formatPrice} from "../../../../../../utils/myUtils";
import classNames from "classnames/bind";
import styles from './Listselect.module.scss';
import { memo } from "react";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);
function Listselect({onInResetPrice,selectColors,onInSelectColor,selectSizes,onInSelectSize,onInClearAll}) {
    const {minPrice,maxPrice,maxPriceDf,minPriceDf} = useSelector((state)=>state.shop)
    return (  
        <div className={cx('list-select')}>
        {(minPrice !== minPriceDf || maxPrice !== maxPriceDf) && (
            <span onClick={() => onInResetPrice()} className={cx('item-select')}>
                {formatPrice.format(minPrice)} - {formatPrice.format(maxPrice)} x
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
        {(minPrice !== minPriceDf ||
            maxPrice !== maxPriceDf ||
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
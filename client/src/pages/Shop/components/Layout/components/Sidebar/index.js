import Tippy from '@tippyjs/react';
import classNames from "classnames/bind";
import { memo } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactSlider from 'react-slider';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import {formatPrice} from '../../../../../../utils/myUtils';
import styles from './SideBar.module.scss';
const cx = classNames.bind(styles)
let max_price_df = 10000000;
let min_price_df = 1000000;
function Sidebar({param,onInSelectColor,onInSelectSize,selectColors,selectSizes,value,onInChangePrice,onInAfterChangePrice}) {
    const {brands:listBrand,categories:listCategory,colors:listColors,sizes:listSizes} = useSelector((state) => state.shop);
    return ( 
        <div className={cx('navbar-left')}>
                        <div className={cx('category')}>
                            <h2 className={cx('title-category')}>categories</h2>
                            {listCategory?.map((e) => {
                                return (
                                    <div key={e.id} className={cx('item-category')}>
                                        <Link
                                            className={cx('name', {
                                                active: param?.category === e.name.toLowerCase(),
                                            })}
                                            to={`/shop/product-category/${e.name.toLowerCase()}`}
                                        >
                                            {e.name}
                                            <span
                                                className={cx('count', {
                                                    active: param?.category === e.name.toLowerCase(),
                                                })}
                                            >
                                                ({e.countproduct})
                                            </span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('filter-price')}>
                            <h3 className={cx('title-price')}>Price</h3>
                            <ReactSlider
                                className={cx('slider')}
                                value={value}
                                onChange={onInChangePrice}
                                min={min_price_df}
                                max={max_price_df}
                                onAfterChange={()=>onInAfterChangePrice()}
                            ></ReactSlider>
                            <span className={cx('show-price')}>
                                Range :{' '}
                                <span className={cx('price')}>
                                    {formatPrice.format(value[0])} - {formatPrice.format(value[1])}
                                </span>
                            </span>
                        </div>
                        <div className={cx('filter-color')}>
                            <h3 className={cx('color-title')}>COLOR</h3>
                            <ul className={cx('list-color')}>
                                {listColors?.map((e, i) => {
                                    return (
                                        <Tippy key={i} animation="scale" content={e.name}>
                                            <li
                                                onClick={() => onInSelectColor(e.name)}
                                                className={cx('color', {
                                                    'active-focus': selectColors.includes(e.name),
                                                })}
                                            >
                                                <div
                                                    className={cx('random-color')}
                                                    style={{ backgroundColor: e.code }}
                                                ></div>
                                            </li>
                                        </Tippy>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={cx('filter-size')}>
                            <h3 className={cx('size-title')}>SIZE</h3>
                            <ul className={cx('list-size')}>
                                {listSizes?.map((e, i) => {
                                    return (
                                        <Tippy animation="scale" placement="top" key={i} content={e.name}>
                                            <li
                                                className={cx('size', {
                                                    'active-focus': selectSizes.includes(e.name),
                                                })}
                                                onClick={() => onInSelectSize(e.name)}
                                            >
                                                <span>{e.name}</span>
                                            </li>
                                        </Tippy>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={cx('filter-brand')}>
                            <h3 className={cx('title-brand')}>BRANDS</h3>
                            {listBrand?.map((e) => {
                                return (
                                    <div key={e.id} className={cx('item-brand')}>
                                        <Link
                                            className={cx('name', {
                                                active: param.brand === e.name.toLowerCase(),
                                            })}
                                            to={`/shop/product-brand/${e.name.toLowerCase()}`}
                                        >
                                            {e.name}
                                            <span
                                                className={cx('count', {
                                                    active: param.brand === e.name.toLowerCase(),
                                                })}
                                            >
                                                {' '}
                                                ({e.countproduct})
                                            </span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
     );
}

export default memo(Sidebar);
import classNames from 'classnames/bind';
import styles from './Topbar.module.scss';
import SideBar from '../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { memo, useState } from 'react';
import CustomModal from '../../../../../../components/Modal/Modal';
import FilterDropDown from './FilterDropDown';
const cx = classNames.bind(styles);
function Topbar({ onInSort, onInChangeLayout, layout }) {
    const [isModal, setIsModal] = useState(false);
    return (
        <>
            <div className={cx('top-bar')}>
                <div className={cx('filter-dropdown')}>
                    <FilterDropDown onInSort={onInSort}></FilterDropDown>
                </div>
                {/* <div> {(min_price !== 1000000 || max_price !== 10000000) && <span> Clear ALL</span>}</div> */}
                <div className={cx('list-layout')}>
                    <div
                        onClick={() => onInChangeLayout(6)}
                        className={cx('layout-item', {
                            active: layout === 6,
                        })}
                    >
                        <span className={cx('item')}></span>
                        <span className={cx('item')}></span>
                    </div>
                    <div
                        onClick={() => onInChangeLayout(4)}
                        className={cx('layout-item', {
                            active: layout === 4,
                        })}
                    >
                        <span className={cx('item')}></span>
                        <span className={cx('item')}></span>
                        <span className={cx('item')}></span>
                    </div>
                    <div
                        onClick={() => onInChangeLayout(3)}
                        className={cx('layout-item', {
                            active: layout === 3,
                        })}
                    >
                        <span className={cx('item')}></span>
                        <span className={cx('item')}></span>
                        <span className={cx('item')}></span>
                        <span className={cx('item')}></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Topbar);

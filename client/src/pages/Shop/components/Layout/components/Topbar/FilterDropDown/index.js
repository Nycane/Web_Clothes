import classNames from 'classnames/bind';
import styles from './FilterDropDown.module.scss';
const cx = classNames.bind(styles);
function FilterDropDown({ onInSort }) {
    return (
        <div className={cx('filter-dropdown')}>
            <select id="select" onChange={(e) => onInSort(e.target.value)} className={cx('select')}>
                <option value="Default">Default sorting</option>
                <option value="Asc">Sort by price: low to high</option>
                <option value="Desc">Sort by price: high to low</option>
            </select>
        </div>
    );
}

export default FilterDropDown;

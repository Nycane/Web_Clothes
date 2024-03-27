import classNames from 'classnames/bind';
import styles from './FilterDropDown.module.scss';
const cx = classNames.bind(styles);
function FilterDropDown({ onInSort,sortValue }) {
    return (
        <div className={cx('filter-dropdown')}>
            <select id="select" value={sortValue}  onChange={(e) => onInSort(e.target.value)} className={cx('select')}>
                <option value="default">Default sorting</option>
                <option value="asc">Sort by price: low to high</option>
                <option value="desc">Sort by price: high to low</option>
            </select>
        </div>
    );
}

export default FilterDropDown;

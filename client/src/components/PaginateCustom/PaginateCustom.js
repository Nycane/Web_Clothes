import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './PaginateCustom.module.scss';
const cx = classNames.bind(styles);
function PaginateCustom({ pageCount, onInChangePage, currentPage = null, forcePage = null, leftNavigation ="Previous", rightNavigation="Next",customPageLinkNext,customPageLinkBack=null,isHiddenPageItem=false ,customItemNext,customItemBack}) {
    return (
        <ReactPaginate
            nextLabel={currentPage !== pageCount-1 ? rightNavigation : null}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={ currentPage !== 0 ? leftNavigation : null}
            pageClassName={cx('page-item',{"page-item-display-none":isHiddenPageItem})}
            pageLinkClassName={cx('page-link-text')}
            previousClassName={cx('page-item-back',{[customItemBack]:customItemBack})}
            previousLinkClassName={customPageLinkBack || cx('page-link') }
            nextClassName={cx('page-item-next',{"custom":currentPage===0,[customItemNext]:customItemNext})}
            nextLinkClassName={customPageLinkNext || cx('page-link')}
            breakLabel="..."
            breakClassName={cx('page-item',{"page-item-display-none":isHiddenPageItem })}
            breakLinkClassName={cx('page-link')}
            containerClassName={cx('pagination',{
                "custom":currentPage===0
            })}
            activeClassName={cx('active-page')}
            onPageChange={onInChangePage}
            forcePage={forcePage}
        />
    );
}

export default PaginateCustom;

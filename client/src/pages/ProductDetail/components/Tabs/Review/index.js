import { faXmark,faStar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import PaginateCustom from '../../../../../components/PaginateCustom';
import { formatDate, scrollViewToPoint } from '../../../../../utils/myUtils';
import styles from './Review.module.scss';
const cx = classNames.bind(styles);

function Review({ user, activeCmt, onInDeleteComment, listComments, scrollPosition, Tippy, productId }) {
    const [currentPage, setCurrentPage] = useState(0);
    const isLoading = useSelector((state)=>state.user.isLoading)
    console.log("ActiveCmt",isLoading)
    const itemperPage = 4;
    const endPage = currentPage * itemperPage + itemperPage;
    const startPage = currentPage * itemperPage;
    const pageCount = Math.ceil(listComments.length / itemperPage);
    function onChangePage({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        scrollViewToPoint(scrollPosition);
    }
    useEffect(() => {
        setCurrentPage(0);
    }, [productId]);
    useEffect(()=>{
        listComments.length <= itemperPage && setCurrentPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[listComments])
    return (
        <>
            {listComments.slice(startPage, endPage).map((e,i) => (
                <div key={i} className={cx('review-item')}>
                    <div className={cx('info-user')}>
                        <img className={cx('avatar')} alt="" src={e.avatar} width="50px" height="50px"></img>
                        <div className={cx('rate')}>
                            {Array.from(Array(e.rating), (_, i) => (
                                <span key={i} className={cx('icon-star')}>
                                   <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                </span>
                            ))}
                            <p className={cx('name')}>{e.username}</p>
                            <span className={cx('date')}>{formatDate(e.create_at)}</span>
                        </div>
                    </div>
                    <div className={cx('info-comment')}>
                        <p className={cx('comment-text')}>{e.content}</p>
                    </div>
                    {user?.id === e.userId && (
                        <Tippy animation="scale" content="Delete">
                            <div onClick={() => onInDeleteComment(e.id,i)} className={cx('remove-comment',{
                                isRemove:isLoading && i === activeCmt
                            })}>
                                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                            </div>
                        </Tippy>
                    )}
                </div>
            ))}
            {pageCount > 1 && <PaginateCustom customItemNext = {cx('custom-item-next')} customItemBack = {cx('custom-item-back')} pageCount={pageCount} forcePage={currentPage} onInChangePage={onChangePage} />}
        </>
    );
}

export default Review;

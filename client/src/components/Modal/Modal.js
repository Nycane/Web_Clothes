import classNames from 'classnames/bind';
import Modal from 'react-modal';
import styles from './Modal.module.scss';
const cx = classNames.bind(styles);
const CustomModal = (props) => {
    return (
        <Modal
            appElement={document.getElementById('root')}
            isOpen={props.modalIsOpen}
            onRequestClose={props.onInCloseModal}
            className={cx('modal', {
                [props.customCss]: props.customCss,
            })}
            overlayClassName={cx('overlay')}
        >
            {props.children}
            {props.btnClosed && (
                <button
                    className={cx('btn-close', {
                        [props.customBtnClose]: props.customBtnClose,
                    })}
                    onClick={props.onInCloseModal}
                >
                    X
                </button>
            )}
        </Modal>
    );
};

export default CustomModal;

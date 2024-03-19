import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import Toast from '../../../../../components/Toastify';
import style from './AccountAvatar.module.scss';
// import { useSelector } from 'react-redux';
import Image from '../../../../../components/Img';
const cx = classNames.bind(style);
function AccountAvatar({ register, setValue, userAvatar, Skeleton, isLoading }) {
    // const user = useSelector((state) => state.user)
    const [avatar, setAvatar] = useState('');
    function handleFile(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        // Check for valid image file
        if (!file?.type?.startsWith('image/')) {
            e.target.value = '';
            Toast('error', 'Please select a valid image file.');
            return;
        }

        // Check for file size under 100000 bytes
        if (file?.size > 100000) {
            e.target.value = '';
            Toast('error', 'Image size cannot exceed 100000 bytes.');
            return;
        }
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAvatar(reader.result);
                setValue('avatar', reader.result);
            };
            reader.onerror = () => {
                Toast('error', 'Something went wrong');
            };
        }
    }
    return (
        <div className={cx('box-avatar')}>
            <div>
                {!isLoading ? (
                    <Image className={cx('avatar')} src={avatar || userAvatar} alt="avatar"></Image>
                ) : (
                    <Skeleton className={cx('avatar')}></Skeleton>
                )}
            </div>
          <div className={cx('input')}>
                <input type="file" id="file" onChange={(e) => handleFile(e)} />
                <label htmlFor="file" className={cx('custom-btn')}>Select File</label>
                <input type="hidden" {...register('avatar')} />
          </div>
        </div>
    );
}

export default AccountAvatar;

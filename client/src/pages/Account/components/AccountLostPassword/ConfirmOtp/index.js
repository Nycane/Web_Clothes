import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import userApi from '../../../../../apis/userApi';
import Validate from '../../../../../components/Hook/useValidate';
import Toast from '../../../../../components/Toastify/Toastify';
import userSlice from '../../../../../redux/slice/userSlice';
import { delay } from '../../../../../utils/myUtils';
import style from './ConfirmOtp.module.scss';
const cx = classNames.bind(style);
function ConfirmOtp({ email }) {
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    const options = {
        otp: yup.number().typeError('This field cannot be empty').required(),
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = Validate(options);

    // Kiểm tra mã OTP có hợp lệ không
    const onSubmit = async (data) => {
        try {
            await userApi.verifyOtp(data);
            dispatch(userSlice.actions.verifyOtp(true));
        } catch (error) {
            Toast('error', error.response.data.message,1500);
        }
        reset();
    };
    
    // Gửi lại mã OTP
    async function handleSendOtp(email) {
        try {
            setIsLoading(true)
            let result = await userApi.forgetPassword({email});
            await delay(500);
            setIsLoading(false)
            Toast('success', result.message,"1500");
        } catch (error) {
            Toast('error', error.response.data.message);   
            setIsLoading(false)
        }
    }
    return (
        <form autoComplete="no" noValidate onSubmit={handleSubmit(onSubmit)}>
            <p className={cx('text-otp')}>
            An otp code has been sent to the email <span className={cx('name')}>{email}</span>{' '}
            </p>

            <input input="text" {...register('otp')} className={cx('input-otp')}></input>
            <span className={cx('error')}>{errors.otp?.message}</span>
            <div className={cx('btns')}>
                <button onClick={()=>handleSendOtp(email)} type="button" className={cx('btn-send-otp')}>
                {isLoading ? (
                                            <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />
                                        ) : (
                                            <>  Resend Otp</>
                                        )}
                   
                </button>
                <button className={cx('btn-confirm-otp')}>Confirm</button>
            </div>
        </form>
    );
}

export default ConfirmOtp;

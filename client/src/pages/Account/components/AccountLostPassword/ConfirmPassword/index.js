import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import userApi from '../../../../../apis/userApi';
import Toast from '../../../../../components/Toastify';
import Validate from '../../../../../components/Hook/useValidate';
import style from './ConfirmPassword.module.scss';
import { delay } from '../../../../../utils/myUtils';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../../redux/slice/userSlice';
import { useState } from 'react';
import IconLoading from '../../../../../components/Loading/IconLoading/IconLoading';
const cx = classNames.bind(style);
function ConfirmPassword({ email }) {
    const navigate = useNavigate();
    const isAuth = useSelector((state) => state.user.isAuth);
    const [isLoading,setIsLoading] = useState(false)
    const user = useSelector((state) => state.user.info);
    const dispatch = useDispatch();
    const options = {
        newPw: yup
            .string()
            .trim()
            .required('This password field cannot be empty')
            .min(8, 'Password must have 8 characters or more')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required(),
        confirmPw: yup
            .string()
            .trim()
            .oneOf([yup.ref('newPw'), null], 'Passwords must match'),
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = Validate(options);
    const onSubmit = async (data) => {
        try {
            let newData = Object.assign(data, { email });
            setIsLoading(true)
            await delay(500)
            let result = await userApi.resetPassword(newData);
            setIsLoading(false)
            Toast('success', result.message);
            isAuth
                ? dispatch(logout(user))
                      .unwrap()
                      .then(() => {
                          navigate('/login', { replace: true });
                      })
                : navigate('/login', { replace: true });
        } catch (error) {
            Toast('error', error.response.data.message);
        }
        reset();
    };
    return (
        <form className={cx('form-confirmPw')} autoComplete="no" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('box-newpw')}>
                <label className={cx('text-pw')} htmlFor="newpw">
                    New Password
                </label>
                <input type="password" id="newpw" className={cx('input-newpw')} {...register('newPw')}></input>
                <span className={cx('error')}>{errors.newPw?.message}</span>
            </div>

            <div className={cx('box-confirmpw')}>
                <label className={cx('text-confirmpw')} htmlFor="confirmpw">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmpw"
                    className={cx('input-confirmpw')}
                    {...register('confirmPw')}
                ></input>
                <span className={cx('error')}>{errors.confirmPw?.message}</span>
            </div>

            <button className={cx('btn-confirmpw')}>{isLoading?<IconLoading></IconLoading>:"Change"}</button>
        </form>
    );
}

export default ConfirmPassword;

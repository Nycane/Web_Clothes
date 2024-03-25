import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Validate from '../../../../components/Hook/useValidate';
import IconLoading from '../../../../components/Loading/IconLoading/IconLoading';
import { changePw } from '../../../../redux/slice/userSlice';
import styles from './AccountChangePassword.module.scss';
import { Link } from 'react-router-dom';
import { ACCOUNT_PATHS } from '../../../../constants';
const cx = classNames.bind(styles);
function AccountChangePassword({ user }) {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isChangePw);
    const options = {
        currentPw: yup.string().trim().required('This field cannot be empty'),
        // passwordLogin: yup.string().required('This password field cannot be empty'),
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
    } = Validate(options, undefined);
    const onSubmit = (data) => {
        const newData = {
            ...user,
            currentPw: data.currentPw,
            newPw: data.newPw,
        };
        dispatch(changePw(newData))
        .unwrap()
        .then((data)=>{
            reset();
        })
        .catch((data)=>{
            reset()
        })
        console.log("isLoading",isLoading)
    };
    return (
        <form className={cx('change-pw-wrap')} onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('field-item')}>
                <label className={cx('label')}>Current password</label>
                <input type="password" {...register('currentPw')} className={cx('input')}></input>
                <span className={cx('error')}>{errors.currentPw?.message}</span>
            </div>
            <div className={cx('field-item')}>
                <label className={cx('label')}>New password</label>
                <input type="password" {...register('newPw')} className={cx('input')}></input>
                <span className={cx('error')}>{errors.newPw?.message}</span>
            </div>
            <div className={cx('field-item')}>
                <label className={cx('label')}>Confirm new password</label>
                <input type="password" {...register('confirmPw')} className={cx('input')}></input>
                <span className={cx('error')}>{errors.confirmPw?.message}</span>
            </div>
            <div className={cx('user-action-container')}>
                <button className={cx('btn-changepw')} type="submit">
                    {isLoading ? <IconLoading></IconLoading> : 'save changes'}
                </button>
                <Link to={ACCOUNT_PATHS.ACCOUNT + ACCOUNT_PATHS.LOST_PASSWORD} className={cx('lost-password')}>
                    Lost your password?
                </Link>
            </div>
        </form>
    );
}

export default AccountChangePassword;

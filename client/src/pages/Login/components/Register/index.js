import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Validate from '../../../../components/Hook/useValidate';
import { register as handleRegister } from '../../../../redux/slice/userSlice';
import IconLoading from '../../../../components/Loading/IconLoading/IconLoading';
import { scrollViewToPoint } from '../../../../utils/myUtils';
import styles from './Register.module.scss';
const cx = classNames.bind(styles);
function Register({ scrollPosition,toggle, setToggle }) {
    const isLoading = useSelector((state)=>state.user.isLoading)
    // Validate form
    const options = {
        fullname: yup
            .string()
            .trim()
            .required('This fullname field cannot be empty')
            .matches(/^[A-Za-z\u00C0-\u1EF9\s]*$/, 'Cannot contain special characters or numbers')
            .max('200', 'This fullname maximum 200 character'),
        phone: yup
            .string().trim()
            .required('This field cannot be empty')
            .matches(/^[0-9]+$/, 'Must be a valid number')
            .min(10, 'Please enter a correct phone number')
            .max(11, 'Please enter a correct phone number'),
        address: yup.string().required('This address field cannot be empty').max(200, 'Address maximum 200 characters'),
        email: yup
            .string().trim()
            .email('Please enter a valid email address: Example@gmail.com')
            .required('This email field cannot be empty'),
        password: yup
            .string().trim()
            .required('This password field cannot be empty')
            .min(8, 'Password must have 8 characters or more')
            .max(20, 'Password maximum 20 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required(),
    };
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors },
    } = Validate(options);
    const dispatch = useDispatch();
    // Request sever
    const onSubmit = async (data) => {
        dispatch(handleRegister(data))
            .unwrap()
            .then((data) => {
                reset();
                setToggle('signin');
            })
            .catch((error) => {
                reset();
                console.log('catch register>>', error);
            });
    };
    const handleSetToggle = () => {
        setToggle('signin');
        clearErrors();
        scrollViewToPoint(scrollPosition)
    };
    return (
        <>
            <form
                autoComplete="no"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className={cx('form-register', {
                    active: toggle === 'register',
                })}
            >
                <input {...register('fullname')} type="text" placeholder="Name*" />
                <p className={cx('error')}>{errors.fullname?.message}</p>

                <input {...register('email')} type="text" placeholder="Email*" />
                <p className={cx('error')}>{errors.email?.message}</p>

                <input {...register('password')} type="password" placeholder="Password*" />
                <p className={cx('error')}>{errors.password?.message}</p>

                <input {...register('phone')} type="text" placeholder="Phone*" />
                <p className={cx('error')}>{errors.phone?.message}</p>

                <input {...register('address')} type="text" placeholder="Address*" />
                <p className={cx('error')}>{errors.address?.message}</p>

                <button type="submit" className={cx('btn-register')}>
                   { isLoading ? <IconLoading></IconLoading> : "register"}
                </button>
                <button
                    onClick={() => {
                        handleSetToggle();
                    }}
                    className={cx('btn-next-signin')}
                    type="button"
                >
                  Already has an account
                </button>
            </form>
        </>
    );
}

export default Register;

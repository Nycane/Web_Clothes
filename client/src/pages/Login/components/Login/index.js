import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import {ACCOUNT_PATHS} from '../../../../constants';
import { scrollViewToPoint } from '../../../../utils/myUtils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useValidate from '../../../../components/Hook/useValidate';
import { login } from '../../../../redux/slice/userSlice';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);
function Login({ setToggle, toggle,scrollPosition }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Validate form
    const options = {
        email: yup
            .string().trim()
            .email('Please enter a valid email address: Example@gmail.com')
            .required('This email field cannot be empty'),
        password: yup.string().trim().required('This password field cannot be empty'),
    };
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        clearErrors,
        formState: { errors },
    } = useValidate(options);
    const onSubmit = async (data) => {
        dispatch(login(data))
            .unwrap()
            .then((data) => {
                navigate(location?.state?.from?.pathname?`${location.state.from.pathname}`:'/',{replace:true});
            })
            .catch((error) => {
                console.log(error);
            });
        reset();
    };
    function handleRedirectGoogle() {
        const url = process.env.NODE_ENV === "development" ? process.env.GOOGLE_REDIRECT_URL_LOCAL :process.env.GOOGLE_REDIRECT_URL_HOST;
        window.open(url, '_self');
        setValue('email','');
        setValue('password','');
    }
    function handleRedirectFacebook() {
        const url = process.env.NODE_ENV === "development" ? process.env.FACEBOOK_REDIRECT_URL_LOCAL :process.env.FACEBOOK_REDIRECT_URL__HOST;
        window.open(url, '_self');
        setValue('email','');
        setValue('password','');
    }
    function handleSetToogle() {
      scrollViewToPoint(scrollPosition)
        setToggle('register');
        clearErrors();
    }
        return (
        <form
            autoComplete="no"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={cx('form-signin', {
                active: toggle === 'signin',
            })}
        >
            <input type="text" {...register('email')} placeholder="Name*" />
            <span className={cx('error')}>{errors.email?.message}</span>
            <input type="password" {...register('password')} placeholder="Password*" />
            <span className={cx('error')}>{errors.password?.message}</span>
            <Link to={ACCOUNT_PATHS.ACCOUNT+ACCOUNT_PATHS.LOST_PASSWORD} className={cx('lost-password')}>
                lost your password?
            </Link>
            <button type="submit" className={cx('btn-signin')}>
                Sign In
            </button>
            <button onClick={() => handleSetToogle()} className={cx('btn-next-register')} type="button">
                Create An Account
            </button>
            <div className={cx('social-login')}>
                <div className={cx('line')}>
                    <hr className={cx('line-one')}></hr>
                    <span className={cx('line-text')}>or Sign In with</span>
                    <hr className={cx('line-two')}></hr>
                </div>
                <div className={cx('social-button')}>
                    <button type="button" onClick={handleRedirectGoogle} className={cx('google-button')}>
                        <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                        <span className={cx('text-gg')}>Google</span>
                    </button>
                    <button type="button" onClick={handleRedirectFacebook} className={cx('facebook-button')}>
                        <FontAwesomeIcon className={cx('icon-gg')} icon={faFacebook}></FontAwesomeIcon>
                        <span className={cx('text-fb')}> FaceBook </span>
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Login;

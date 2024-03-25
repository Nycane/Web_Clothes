import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import userApi from '../../../../apis/userApi';
import Validate from '../../../../components/Hook/useValidate';
import IconLoading from '../../../../components/Loading/IconLoading/IconLoading';
import Toast from '../../../../components/Toastify';
import userSlice from '../../../../redux/slice/userSlice';
import { delay } from '../../../../utils/myUtils';
import style from './AccountLostPassword.module.scss';
import ConfirmOtp from './ConfirmOtp';
import ConfirmPassWord from './ConfirmPassword';
const cx = classNames.bind(style);
function AccountLostPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const isOtp = useSelector((state) => state.user.isOtp);
    const options = {
        email: yup
            .string()
            .email('Please enter a valid email address: Example@gmail.com')
            .required('This email field cannot be empty'),
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = Validate(options);
    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            let result = await userApi.forgetPassword(data);
            await delay(500)
            setIsLoading(false)
            result?.data?.email && setEmail(result.data.email);
            Toast('success', result.message,"1500");
        } catch (error) {
            setIsLoading(false)
            Toast('error', error.response.data.message);
        }
            reset();
    };
    useEffect(() => {
        dispatch(userSlice.actions.verifyOtp(false));
    }, [dispatch]);
    return (
        <>
            <Container style={{marginBottom:90}}>
                <Row>
                    <Col>
                        {!email? (
                            <>
                                <p className={cx('text')}>
                                    Lost your password? Please enter your username or email address. You will receive a
                                    link to create a new password via email.
                                </p>
                                <form autoComplete="no" noValidate onSubmit={handleSubmit(onSubmit)}>
                                    <label htmlFor="email" className={cx('label')}>
                                        Username or Email
                                    </label>
                                    <input id="email" className={cx('input')} {...register('email')}></input>
                                    <span className={cx('error')}>{errors.email?.message}</span>
                                    <button className={cx('btn-reset-password')}>
                                        {isLoading ? (
                                           <IconLoading/>
                                        ) : (
                                            <> reset password</>
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                {!isOtp ? (
                                    <ConfirmOtp email={email}></ConfirmOtp>
                                ) : (
                                    <ConfirmPassWord email={email}></ConfirmPassWord>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AccountLostPassword;

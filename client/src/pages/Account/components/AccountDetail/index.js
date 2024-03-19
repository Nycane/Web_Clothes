import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import useValidate from '../../../../components/Hook/useValidate';
import { updateUser } from '../../../../redux/slice/userSlice';
import styles from './AccountDetail.module.scss';
import Skeleton from '../../../../components/Loading/Skeleton';
import AccountAvatar from './AccountAvatar';
const cx = classNames.bind(styles);
function AccountDetail({ user }) {
    const isLoading = useSelector((state) => state.user.isLoading);
    const dispatch = useDispatch();
    const options = {
        email: yup.string().trim().email().required('This field cannot be empty'),
        userName: yup
            .string()
            .trim()
            .required('This field cannot be empty')
            .matches(/^[A-Za-z\u00C0-\u1EF9\s]*$/, 'Cannot contain special characters or numbers')
            .max(200, 'Name cannot exceed 50 characters'),
        phone: yup
            .string()
            .trim()
            .required('This field cannot be empty')
            .max(11, 'Please enter a correct phone number ')
            .matches(/^[0-9]+$/, 'Must be a valid number'),
    };
    const optionsForm = {
        defaultValues: {
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
            avatar: user.avatar,
        },
    };
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useValidate(options, optionsForm);

    const onSubmit = async (data) => {
        const info = { ...user, ...data };
        dispatch(updateUser(info));
        reset();
    };

    useEffect(() => {
        setValue('userName', user.userName);
        setValue('email', user.email);
        setValue('phone', user.phone);
        setValue('address', user.address);
        setValue('avatar', user.avatar);
    }, [setValue, user]);

    return (
        <Container>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col>
                                <AccountAvatar
                                    Skeleton={Skeleton}
                                    register={register}
                                    setValue={setValue}
                                    userAvatar={user.avatar}
                                    isLoading={isLoading}
                                ></AccountAvatar>
                            </Col>
                        </Row>
                        <div className={cx('field-item')}>
                            <label htmlFor="userName" className={cx('label')}>
                                Full Name *
                            </label>
                            {!isLoading ? (
                                <input
                                    id="userName"
                                    type="text"
                                    {...register('userName', {
                                        required: true,
                                    })}
                                    className={cx('input')}
                                ></input>
                            ) : (
                                <Skeleton className={cx('input')}></Skeleton>
                            )}
                            <em className={cx('display-name')}>
                                This will be how your name will be displayed in the account section and in reviews
                            </em>
                            <span className={cx('error')}>{errors.userName?.message}</span>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="email" className={cx('label')}>
                                Email address *
                            </label>
                            {!isLoading ? (
                                <input
                                    disabled={user.type_log === 'LOCAL' ? false : true}
                                    id="email"
                                    type="text"
                                    {...register('email')}
                                    className={cx('input')}
                                ></input>
                            ) : (
                                <Skeleton className={cx('input')}></Skeleton>
                            )}

                            <span className={cx('error')}>{errors.email?.message}</span>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="phone" className={cx('label')}>
                                Phone *
                            </label>
                            {!isLoading ? (
                                <input id="phone" type="text" {...register('phone')} className={cx('input')}></input>
                            ) : (
                                <Skeleton className={cx('input')}></Skeleton>
                            )}
                            <span className={cx('error')}>{errors.phone?.message}</span>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="address" className={cx('label')}>
                                Address *
                            </label>
                            {!isLoading ? (
                                <input
                                    id="address"
                                    type="text"
                                    {...register('address')}
                                    className={cx('input')}
                                ></input>
                            ) : (
                                <Skeleton className={cx('input')}></Skeleton>
                            )}
                            <span className={cx('error')}>{errors.address?.message}</span>
                        </div>
                        {!isLoading ? (
                            <button className={cx('btn-changepw')} type="submit">
                                save changes
                            </button>
                        ) : (
                            <Skeleton width={205} height={50} className={cx('btn-changepw-skeleton')}></Skeleton>
                        )}
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountDetail;

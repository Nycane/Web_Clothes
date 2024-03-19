import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { loginSocial } from '../../../../redux/slice/userSlice';
import Image from '../../../../components/Img';
import TextLoading from '../../../../components/Loading/TextLoading';
import {delay} from '../../../../utils/myUtils';
import classNames from 'classnames/bind';
import styles from './LoginSocial.module.scss';
import Toast from '../../../../components/Toastify';
const cx = classNames.bind(styles);
function LoginSocial() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();
    const { verifySocialUser} = useSelector((state) => state.user);
    const [userId, verifycationCode] = param.id.split('&');
    useEffect(() => {
        dispatch(loginSocial({userId,verifycationCode}))
            .unwrap()
            .then(async (data) => {
                // delay 2s before page redirect
                await delay(2000);
                navigate('/',{replace:true});
                Toast('success', 'Logged in successfully');
            })
            .catch((error) => {
                console.log(error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {verifySocialUser ? (
                <TextLoading></TextLoading>
            ) : (
                    <Image
                        src="https://res.cloudinary.com/djdsp9etg/image/upload/v1703755269/image/Fixed-Sorry-you-are-not-allowed-to-access-this-page-2048x1195_s5x6c7.png"
                        alt="You not have access"
                        width={'100%'}
                        height={'100%'}
                        className={cx('img')}
                    ></Image>
            )}
        </>
    );
}

export default LoginSocial;

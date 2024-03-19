import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toastify.scss';
function Toast(type = 'success', message, timeClose = 1000, position = 'top-left') {
    toast[type](message, {
        position: position,
        autoClose: timeClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: { width: '30ppx' },
    });
}
export default Toast;

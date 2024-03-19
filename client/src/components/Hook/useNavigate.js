import { useNavigate } from 'react-router-dom';

function useCustomNavigate () {
    const navigate = useNavigate();
    function redirectToLogin(){
        navigate('/login',{replace:true})
    }
    return ( redirectToLogin );
}

export default useCustomNavigate ;
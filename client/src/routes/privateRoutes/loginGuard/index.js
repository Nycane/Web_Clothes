import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function LoginGuard({children}) {
    const user = useSelector(state=>state.user);
    return (  
        user&&user.isAuth ? <Navigate to="/" replace/> : children
    );
}

export default LoginGuard;
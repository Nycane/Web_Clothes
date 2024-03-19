import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function PrivateRoutes({children}) {
    const isAuth = useSelector(state=>state.user.isAuth);
    const location = useLocation()
   
    const pathName = location.pathname.split('/');
    if(pathName[pathName.length-1]==="lost-password"){
        return children
    }
    return ( 
        <>
           
            {isAuth?children:<Navigate to="/login" replace state={{from:location}} />}
        </>
     );
}

export default PrivateRoutes;
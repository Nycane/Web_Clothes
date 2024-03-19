import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import shopSlice from '../../../../redux/slice/shopSlice';
import Layout from "../Layout";
function Category() {
    let dispatch = useDispatch()
    let param = useParams()
    // const listProduct = useSelector(state=>state.shop.items)
    useEffect(()=>{
        dispatch(shopSlice.actions.setCategory(param.category))
        // dispatch(shopSlice.actions.setBrand(""))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[param])
    return ( 
        <Layout param={param}>
        </Layout>
       
     );
}

export default Category;
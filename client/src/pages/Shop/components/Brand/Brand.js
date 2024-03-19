import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import shopSlice from "../../../../redux/slice/shopSlice";
import Layout from "../Layout";
function Brand() {
    let param = useParams()
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(shopSlice.actions.setBrand(param.brand))
        // dispatch(shopSlice.actions.setCategory(""))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[param])
    // const listProductBrand = useSelector((state) => state.shop.items)
    return ( 
        <Layout  param={param}>
        </Layout>
       
     );
}

export default Brand;
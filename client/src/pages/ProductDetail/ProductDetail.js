// import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SliderProducts from '../../components/Slider/SliderProducts';
import productSlice, { getImageById, getProductById, getProducts, getRelateds } from '../../redux/slice/productSlice';
import NotFound from '../NotFound';
import CustomPaging from './components/CustomPaging';
import ProductInfo from './components/ProductInfo';
import Tabs from './components/Tabs';
function ProductDetail() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const isFetch = useSelector((state) => state.product.isFetch);
    const { listProducts, productDetail, listImages, listRelateds, listRecentlyViews } = useSelector((state) => state.product);
    const displayedProducts =
        listRecentlyViews.filter((e) => e.id !== parseInt(id)).length > 0
            ? listRecentlyViews.filter((e) => e.id !== parseInt(id))
            : listProducts.filter((e) => e.id !== parseInt(id));

    useEffect(() => {
        dispatch(getProductById(id));
        dispatch(getImageById(id));
        dispatch(getRelateds(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        dispatch(productSlice.actions.addRecentlyViewProduct(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listProducts, id]);
    useEffect(() => {
        dispatch(getProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   
    // check exist product
    if (!isFetch) {
        return <NotFound />;
    }
    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={7} md={12}>
                        <CustomPaging images={listImages}></CustomPaging>
                    </Col>
                    <Col lg={5} md={12}>
                        <ProductInfo product={productDetail}></ProductInfo>
                    </Col>
                </Row>
            </Container>

            {/* ---------------------Tabs----------------------------- */}
            <Tabs productId={id}></Tabs>
            {/* -------------------Slider product---------------------------------- */}
            <SliderProducts products={listRelateds} title="RELATED PRODUCTS" titleCenter slShow={4}></SliderProducts>
            <SliderProducts
                products={displayedProducts}
                title="RECENTLY VIEWED PRODUCTS"
                titleCenter
                slShow={4}
            ></SliderProducts>
            {/*  */}
        </>
    );
}

export default ProductDetail;

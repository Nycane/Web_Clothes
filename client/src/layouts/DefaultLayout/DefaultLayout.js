import SliderHeader from '../components/Header/components/SlideHeader';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import {SLIDER_IMGS}from '../../constants';

function DefaultLayout({ children }) {
    return (
        <>
            <SliderHeader listImg = {SLIDER_IMGS}>
                <Header bg={false}></Header>
            </SliderHeader>
                {children}
            <Footer></Footer>
        </>
    );
}

export default DefaultLayout;

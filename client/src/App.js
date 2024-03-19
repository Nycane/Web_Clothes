import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './routes/privateRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './layouts/DefaultLayout';
import Router from '../src/routes';
import ScrollBackToTop from './components/ScrollBackToTop';
import ScrollTop from './components/ScrollBackToTop/ScrollTop';
import HeaderBannerLayout from './layouts/HeaderBannerLayout';
import HeaderLayout from './layouts/HeaderLayout'
import NotFound from './pages/NotFound';
// import Loading from './Components/Loading/loading';
function App() {
    return (
        <>
            {/* Toastify */}
            <ToastContainer></ToastContainer>
            {/* Auto Scroll Top When Redirect Other Page */}
            <ScrollTop></ScrollTop>
            {/* ScrollToBackTop */}
            <ScrollBackToTop></ScrollBackToTop>
            {/* <BrowserRouter> */}
                <Routes>
                    {Router.map((e, i) => {
                        let Layout = null;
                        if (e.layout === 'HeaderBannerLayout') {
                            Layout = HeaderBannerLayout;
                        }else if (e.layout === 'HeaderLayout') {
                            Layout = HeaderLayout;
                        }else if (e.layout === "DefaultLayout"){
                            Layout = DefaultLayout
                        }
                        if(e.isGuard){
                            return <Route key={i} path={e.path} element={
                                <PrivateRoutes>
                                    <Layout>{e.component}</Layout>
                                </PrivateRoutes>
                        }></Route>;
                        }
                        return <Route key={i} path={e.path} element={Layout ?<Layout>{e.component}</Layout>:e.component}></Route>;
                    })}
                    <Route
                        path="*"
                        element={
                            <HeaderLayout>
                                <NotFound />
                            </HeaderLayout>
                        }
                    />
                </Routes>
            {/* </BrowserRouter> */}
        </>
    );
}

export default App;

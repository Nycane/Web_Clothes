import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TextLoading from './components/Loading/TextLoading';
import GlobalStyles from './components/GlobalStyles/index';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/srote';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GlobalStyles>
                    <BrowserRouter>
                        <Suspense fallback={<TextLoading></TextLoading>}>
                            <App />
                        </Suspense>
                    </BrowserRouter>
                </GlobalStyles>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

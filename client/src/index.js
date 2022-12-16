import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import store from './store/store';
import 'nprogress/nprogress.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <Suspense
            fallback={
                <div
                    style={{ width: '100vw', height: '100vh' }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        >
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Suspense>
    </Provider>,
    // </React.StrictMode>,
);

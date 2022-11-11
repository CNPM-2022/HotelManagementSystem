import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>,
    // </React.StrictMode>,
);

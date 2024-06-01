import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store.jsx'; // import your store
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()
ReactDOM.createRoot(document.getElementById('root')).render(
    <HistoryRouter history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </HistoryRouter>
);

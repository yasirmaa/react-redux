import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './store/store.ts';

const globalStore = legacy_createStore(reducers);

createRoot(document.getElementById('root')!).render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

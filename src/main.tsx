import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import App from './App.tsx';
import { fetchProducts } from './store/productSlice.ts';

store.dispatch(fetchProducts());

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

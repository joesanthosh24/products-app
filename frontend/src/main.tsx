import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';

import EditForm from './components/edit-form.component';
import CreateForm from './components/add-form.component';

import { store } from './store/store.ts';

import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/edit/:id',
    loader: ({ params }) => {
      return {...params}
    },
    Component: EditForm
  },
  {
    path: '/addProduct',
    element: <CreateForm />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

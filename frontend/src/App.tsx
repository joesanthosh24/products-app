import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './components/products.component';
import EditForm from './components/edit-form.component';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Products itemsPerPage={5} />
  },
  {
    path: '/edit/:id',
    loader: ({ params }) => {
      return {...params}
    },
    Component: EditForm
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

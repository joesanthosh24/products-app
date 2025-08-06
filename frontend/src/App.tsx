// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './components/products.component';

function App() {
  return (
    <>
      <Products itemsPerPage={5} />
    </>
  )
}

export default App

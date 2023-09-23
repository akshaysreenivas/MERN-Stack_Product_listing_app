import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import AddCategoryPage from './pages/AddCategoryPage';
import AddProductPage from './pages/AddProductPage';
import ViewProducts from './pages/ViewProducts';

function App() {
  return (
    <>
    {/* routes */}
    <Routes>
      <Route path="/" element={<ViewProducts />} />

      <Route path="/AddCategory" element={<AddCategoryPage />} />

      <Route path="/AddProduct" element={<AddProductPage/>} />
    </Routes>

    {/* Toast container */}
    <ToastContainer newestOnTop limit={3} position="top-center" />
  </>
  );
}

export default App;

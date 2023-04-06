/**------------------------------Assets------------------------------------ */
import './Assets/style.css'
/**------------------------------Pages------------------------------------ */
import EditableTable from "./Pages/editableTable";
import ProductSelector from "./Pages/productListing";
/**------------------------------Dependencies------------------------------------ */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EditableTable />} />
          <Route path="/product-selector" element={<ProductSelector />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

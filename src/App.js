import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ItemDetails from "./pages/ItemDetails";
import NavigationHeader from "./pages/NavigationHeader";
import PurchasedPage from './pages/PurchasedPage';
import ShowMe from './pages/ShowMe';
import SplinePage from "./pages/SplinePage";

function App() {
  return (
    <>
      <NavigationHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ItemDetails />} />
        <Route path="/Purchased" element={<PurchasedPage />} />
        <Route path="/ShowMe" element={<ShowMe/>}/>
        <Route path="/spline" element={<SplinePage />} />
      </Routes>
    </>
  );
}

export default App;

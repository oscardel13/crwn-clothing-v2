import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.reducer";

import { GLobalStyle } from "./global.styles";

const Home = lazy(() => import('./routes/home/home.component')); 
const Shop = lazy(() => import('./routes/shop/shop.component')); 
const Checkout = lazy(() => import('./routes/checkout/checkout.component')); 
const Authentication = lazy(() => import('./routes/authentication/authentication')); 
const Navigation = lazy(() => import('./routes/Navigation/navigation.component'))



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  
  return (
    <Suspense fallback={<Spinner/>}>
      <GLobalStyle/>
        <Routes>
          <Route path='/' element={<Navigation/>}>
            <Route index element={<Home/>}/>
            <Route path='shop/*' element={<Shop/>}/>
            <Route path='auth' element={<Authentication/>}/>
            <Route path='checkout' element={<Checkout/>}/>
          </Route>
        </Routes>
    </Suspense>
  );
};

export default App;

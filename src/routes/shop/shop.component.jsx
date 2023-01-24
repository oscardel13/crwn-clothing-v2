import { Routes, Route,Outlet } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from 'react-redux'; 

import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../../routes/category/category.component';
import { fetchCategoriesStart } from '../../store/category/category.actions'

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart())
      }, []);
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>
    )
}

export default Shop;
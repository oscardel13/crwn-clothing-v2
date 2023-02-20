import { Link } from 'react-router-dom';
import { Category, CategoryItem, CategoryMap } from '../../store/category/category.reducer';

import ProductCard from '../product-card/product-card.component';

import {
    CategoryPreviewContainer,
    Title,
    Preview,
  } from './category-preview.styles';

const CategoryPreview = ({ title, items }: Category) => {

    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {items.map((product)=>
                    <ProductCard key={product.id} product={product}/>
                )}
            </Preview>
        </CategoryPreviewContainer>
    );
}

export default CategoryPreview
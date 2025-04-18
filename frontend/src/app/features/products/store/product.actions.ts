import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const ProductActions = createActionGroup({
  source: 'Product API',
  events: {    
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: any }>(),
    
    'Add Product': props<{ product: Omit<Product, 'id'> }>(),
    'Add Product Success': props<{ product: Product }>(),
    'Add Product Failure': props<{ error: any }>(),
    
    'Update Product': props<{ product: Product }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: any }>(),
    
    'Delete Product': props<{ productId: number }>(),
    'Delete Product Success': props<{ productId: number }>(),
    'Delete Product Failure': props<{ error: any }>(),
    
    'Select Product': props<{ productId: number | null }>(),
    
    'Clear Product Error': emptyProps()
  }
});

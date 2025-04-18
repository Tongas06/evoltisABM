import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Product } from '../models/product.model';
import { ProductActions } from './product.actions';

export interface ProductState extends EntityState<Product> {
  loading: boolean;
  error: any | null;
  selectedProductId: number | null;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = productAdapter.getInitialState({
  loading: false,
  error: null,
  selectedProductId: null,
});

// 4. Crear el Reducer
export const productReducer = createReducer(
  initialState,
  
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    productAdapter.setAll(products, { ...state, loading: false })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(ProductActions.addProduct, (state) => ({
     ...state,
     loading: true,
     error: null,
  })),
  on(ProductActions.addProductSuccess, (state, { product }) =>    
    productAdapter.addOne(product, { ...state, loading: false })
  ),
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(ProductActions.updateProduct, (state) => ({
      ...state,
      loading: true,
      error: null,
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) =>    
    productAdapter.updateOne({ id: product.id, changes: product }, { ...state, loading: false })
  ),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(ProductActions.deleteProduct, (state, { productId }) => ({
      ...state,
      loading: true,
      error: null,
  })),
  on(ProductActions.deleteProductSuccess, (state, { productId }) =>
    productAdapter.removeOne(productId, { ...state, loading: false })
  ),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  
  on(ProductActions.selectProduct, (state, { productId }) => ({
    ...state,
    selectedProductId: productId,
  })),
   
   on(ProductActions.clearProductError, (state) => ({
       ...state,
       error: null,
   }))
);

// Exportamos selectores básicos proporcionados por el adapter
// (Crearemos selectores más específicos en product.selectors.ts)
export const {
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productAdapter.getSelectors();

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, selectAllProducts, selectProductEntities } from './product.reducer';

export const productFeatureKey = 'products';

export const selectProductFeatureState = createFeatureSelector<ProductState>(productFeatureKey);

export const selectAllProductsSelector = createSelector(
  selectProductFeatureState,
  selectAllProducts
);

export const selectProductEntitiesSelector = createSelector(
  selectProductFeatureState,
  selectProductEntities
);

export const selectProductIdsSelector = createSelector(
    selectProductFeatureState,
    (state: ProductState) => state.ids
);

export const selectTotalProductsSelector = createSelector(
    selectProductFeatureState,
    (state: ProductState) => state.ids.length
);


export const selectProductsLoading = createSelector(
  selectProductFeatureState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductFeatureState,
  (state: ProductState) => state.error
);

export const selectSelectedProductId = createSelector(
  selectProductFeatureState,
  (state: ProductState) => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
  selectProductEntitiesSelector,
  selectSelectedProductId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

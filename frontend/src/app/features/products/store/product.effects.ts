import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffects {
  
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    exhaustMap(() => this.productService.getProducts()
      .pipe(
        map(products => ProductActions.loadProductsSuccess({ products })),
        catchError(error => of(ProductActions.loadProductsFailure({ error })))
      )
    )
  ));
  
  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.addProduct),
    switchMap(({ product }) => this.productService.addProduct(product)
      .pipe(
        map(newProduct => ProductActions.addProductSuccess({ product: newProduct })),
        catchError(error => of(ProductActions.addProductFailure({ error })))
      )
    )
  ));
  
  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateProduct),
    switchMap(({ product }) => this.productService.updateProduct(product)
      .pipe(        
        map(() => ProductActions.updateProductSuccess({ product })),
        catchError(error => of(ProductActions.updateProductFailure({ error })))
      )
    )
  ));

   deleteProduct$ = createEffect(() => this.actions$.pipe(
     ofType(ProductActions.deleteProduct),
     switchMap(({ productId }) => this.productService.deleteProduct(productId)
       .pipe(
         map(() => ProductActions.deleteProductSuccess({ productId })),
         catchError(error => of(ProductActions.deleteProductFailure({ error })))
       )
     )
   ));

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}

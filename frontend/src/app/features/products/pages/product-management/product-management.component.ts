import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { ConfirmationService } from 'primeng/api';
import { ProductActions } from '../../store/product.actions';
import {
  selectAllProductsSelector,
  selectProductsLoading,
  selectProductsError,
  selectSelectedProduct
} from '../../store/product.selectors';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManagementComponent implements OnInit {

  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  selectedProduct$: Observable<Product | null | undefined>;

  displayFormDialog: boolean = false;
  isSaving$: Observable<boolean>;

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService
  ) {    
    this.products$ = this.store.select(selectAllProductsSelector);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
    this.selectedProduct$ = this.store.select(selectSelectedProduct);
    this.isSaving$ = this.loading$;
  }

  ngOnInit(): void {    
    this.store.dispatch(ProductActions.loadProducts());
  }

  
  openNewProductForm(): void {
    this.store.dispatch(ProductActions.selectProduct({ productId: null }));
    this.displayFormDialog = true;     
     this.store.dispatch(ProductActions.clearProductError());
  }

  onEditProduct(product: Product): void {
    this.store.dispatch(ProductActions.selectProduct({ productId: product.id }));
    this.displayFormDialog = true;     
     this.store.dispatch(ProductActions.clearProductError());
  }

  onDeleteProduct(productId: number): void {    
    this.confirmationService.confirm({
      message: `¿Estás seguro de que quieres eliminar el producto con ID ${productId}?`,
      accept: () => this.store.dispatch(ProductActions.deleteProduct({ productId }))
    });
  }
  
  onSaveProduct(productData: Omit<Product, 'id'> | Product): void {
    if ('id' in productData && productData.id) {       
       this.store.dispatch(ProductActions.updateProduct({ product: productData as Product }));
    } else {       
       this.store.dispatch(ProductActions.addProduct({ product: productData as Omit<Product, 'id'> }));
    }     
     this.displayFormDialog = false;
  }
  
  onCancelForm(): void {
    this.displayFormDialog = false;
    this.store.dispatch(ProductActions.selectProduct({ productId: null }));
    this.store.dispatch(ProductActions.clearProductError());
  }


   hideDialog(): void {
        this.displayFormDialog = false;
        this.store.dispatch(ProductActions.selectProduct({ productId: null }));
        this.store.dispatch(ProductActions.clearProductError());
    }

}

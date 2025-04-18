import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

  @Input() products: Product[] | null = [];
  @Input() loading: boolean | null = false;
  @Input() error: any | null = null;

  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<number>();

  cols: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Nombre' },
    { field: 'price', header: 'Precio' },
    { field: 'description', header: 'Descripción' }
  ];

  filterValue: string = '';

  constructor() { }

  onEdit(product: Product): void {
    this.editProduct.emit(product);
  }

  onDelete(productId: number): void {
    this.deleteProduct.emit(productId);
  }

  clearFilter(table: any): void {
    this.filterValue = '';
    table.clear();
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }
}

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnChanges {

  @Input() product: Product | null | undefined;
  @Input() isSaving: boolean | null = false;

  @Output() save = new EventEmitter<Omit<Product, 'id'> | Product>();
  @Output() cancel = new EventEmitter<void>();

  productForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {    
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {      
      this.isEditMode = true;
      this.productForm.patchValue(this.product);
    } else if (changes['product'] && !this.product) {       
       this.isEditMode = false;
       this.productForm.reset();
    }     
     if (changes['isSaving']) {
        this.handleSavingState(this.isSaving);
     }
  }
  
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      if (this.isEditMode) {        
        this.save.emit(formData as Product);
      } else {        
        const { id, ...productData } = formData;
        this.save.emit(productData as Omit<Product, 'id'>);
      }
    } else {      
      this.productForm.markAllAsTouched();
      console.error('Formulario inválido');
    }
  }
  
  onCancel(): void {
    this.cancel.emit();
  }

   private handleSavingState(isSaving: boolean | null): void {
        if (isSaving) {
            this.productForm.disable();
        } else {
            this.productForm.enable();
        }
    }
  
  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get description() { return this.productForm.get('description'); }
}

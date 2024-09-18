import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe, AsyncPipe, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  title: string = 'Products'

  productService = inject(ProductService)

  products$: Observable<Product[]> = this.productService.products$

  selectedProduct: Product

  onSelect(product: Product) {
    this.selectedProduct = product
  }

  products: Product[];

}

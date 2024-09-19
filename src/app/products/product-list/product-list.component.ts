import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { AsyncPipe, CommonModule, CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  title: string = 'Products'

  private productService = inject(ProductService)
  private router = inject(Router)

  products$: Observable<Product[]> = this.productService.products$

  selectedProduct: Product

  onSelect(product: Product) {
    this.selectedProduct = product
    this.router.navigateByUrl('/products/' + product.id)
  }

  products: Product[];

  // Pagination
  pageSize = 5
  start = 0
  end = this.pageSize
  currentPage = 1

  nextPage() {
    this.start += this.pageSize
    this.end += this.pageSize
    this.currentPage++
    this.selectedProduct = undefined
  }

  previousPage() {
    this.start -= this.pageSize
    this.end -= this.pageSize
    this.currentPage--
    this.selectedProduct = undefined
  }
}

import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [UpperCasePipe, DatePipe, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  deleteProduct() {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe(
        {
          next: () => {
            console.log('Product deleted.')
            this.productService.resetList();
            this.router.navigateByUrl('/products')
          },
          error: (err) => console.log('Could not delete product! ' + err.message)
        }
      )
  }

  product: Product

  @Input() set id(productId) {
    this
      .productService
      .getProductById(productId)
      .subscribe(
        data => this.product = data
      )
  }

}

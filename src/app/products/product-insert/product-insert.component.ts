import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-insert',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-insert.component.html',
  styleUrl: './product-insert.component.css'
})
export class ProductInsertComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  onSubmit(newProduct: Product) {
    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        {
          next: (product) => {
            console.log('New product saved on the server with id: ' + product.id)
            this.productService.resetList()
            this.router.navigateByUrl('/products')
          },
          error: (err) => console.log('Could not save product! ' + err)
        }
      )
  }

}

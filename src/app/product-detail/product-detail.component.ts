import { ChangeDetectionStrategy, Component, input, OnDestroy, OnInit, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnDestroy {
  product = input<Product>();
  added = output<Product>();

  constructor() {
    console.log('Product:', this.product());
  }

  ngOnInit(): void {
    console.log('Product:', this.product());
  }

  ngOnDestroy(): void {
    
  }

  addToCart() {
    this.added.emit(this.product()!);
  }

  get productTitle() {
    return this.product()!.title;
  }

}

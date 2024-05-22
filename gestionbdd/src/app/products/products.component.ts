//Imports pour Angular
import { Component } from '@angular/core';

//Imports de components Angular Material
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

//Imports de services
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

//Imports de modèles
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

//Imports de components
import { ProductComponent } from '../product/product.component';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductComponent,
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products!: Product[];
  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ){ }

  ngOnInit(){
    this.productService.getAll()
    .subscribe((data:any)=>{
      this.products = data;
    })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'add-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: ('add-product.component.html')
})

export class AddProductDialog {
  categories!: Category[];
  newProduct!: Product;

  constructor(private categoryService: CategoryService){ }
  
  ngOnInit(){
    this.categoryService.getAll()
    .subscribe((data:any)=>{
      this.categories = data
    })
  }
}
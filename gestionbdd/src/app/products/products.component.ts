//Imports pour Angular
import { Component } from '@angular/core';

//Imports de components Angular Material
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

//Imports de services
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

//Imports de modèles
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

//Imports de components
import { ProductComponent } from '../product/product.component';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu.model';
import { ErrorStateMatcher } from '@angular/material/core';

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
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  allProducts!: Product[];
  products!: Product[];
  categories!: Category[];
  searchTerm!: string;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
  ){ }

  ngOnInit(){
    this.productService.getAll()
    .subscribe((data:any)=>{
      this.allProducts = data;
      this.products = data;
    })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public filterProductsByName() {
    this.products = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm));
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'add-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: ('add-product-dialog.html'),
  styleUrl: './products.component.scss'
})

export class AddProductDialog {
  categories!: Category[];
  menus!: Menu[];
  newProduct: Product = new Product;
  srcResult!: any;
  errorMatcher = new MyErrorStateMatcher();
  nameFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [Validators.required]);

  constructor(
    private categoryService: CategoryService,
    private menuService: MenuService
  ){
  }
  
  ngOnInit(){
    this.categoryService.getAll()
    .subscribe((data:Category[])=>{
      this.categories = data;
    })

    this.menuService.getAll()
    .subscribe((data:Menu[])=>{
      this.menus = data;
    })
  }
}
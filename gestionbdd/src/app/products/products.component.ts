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
import { MatStepperModule } from '@angular/material/stepper';

//Imports de services
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

//Imports de modèles
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

//Imports de components
import { ProductComponent } from '../product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/menu.model';
import { Ingredient } from '../models/ingredient.model';
import { TypeOfIngredient } from '../models/type-of-ingredient.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IngredientService } from '../services/ingredient.service';

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
    .subscribe((data:Product[])=>{
      this.allProducts = data;
      this.products = [...data] ;
    });
  }

  public openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result[0] && result[0] === "save") {
        result[1].available = true;
        result[1].image_name = "";
        this.productService.add(result[1])
        .subscribe(() =>{
          this.allProducts.push(result[1]);
          this.productService.getAll()
          .subscribe((data: Product[]) =>{
            this.products = [...data]
            this.allProducts = [...data]
            this.filterProductsByName();
          });
        });
      }
    });
  }

  public filterProductsByName() {
    if(this.searchTerm) {
      this.products = this.allProducts.filter(product => 
        product.name.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(this.searchTerm.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      );
    }
    else {
      this.products = this.allProducts.filter(product => 
        product.name.toLowerCase().includes("")
      );
    }
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
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCheckboxModule,
  ],
  templateUrl: ('add-product-dialog.html'),
  styleUrl: './products.component.scss'
})

export class AddProductDialog {
  categories!: Category[];
  menus!: Menu[];
  ingredients!: Ingredient[];
  typesOfIngredient: TypeOfIngredient[] = [];
  newProduct: Product = new Product;

  constructor(
    private categoryService: CategoryService,
    private menuService: MenuService,
    private ingredientService: IngredientService,
  ){
  }
  
  ngOnInit(){
    this.newProduct.ingredients = []

    this.categoryService.getAll()
    .subscribe((data:Category[])=>{
      this.categories = [...data];
    });

    this.menuService.getAll()
    .subscribe((data:Menu[])=>{
      this.menus = [...data];
    });

    this.ingredientService.getAll()
    .subscribe((data: Ingredient[])=>{
      this.ingredients = [...data];

      this.ingredients.forEach(ingredient => {
        if(!this.typesOfIngredient.find(typeOfIngredient => typeOfIngredient.id === ingredient.typeOfIngredient.id)) {
          this.typesOfIngredient.push(ingredient.typeOfIngredient);
        }
      })
    });
  }

  // Vérification de la présence d'un ingrédient dans le produit
  public checkIngredients(ingredient: Ingredient): boolean {
    return !!this.newProduct.ingredients.find(productIngredient => productIngredient.id === ingredient.id);
  }

  // Ajouter ou retirer un ingrédient de la liste des ingrédients du produit
  public toggleIngredientToProduct(ingredient: Ingredient): void {
    if (!this.checkIngredients(ingredient)) {
      this.newProduct.ingredients.push(ingredient);
    } else {
      this.newProduct.ingredients.splice(this.newProduct.ingredients.indexOf(ingredient), 1);
    }
  }
}
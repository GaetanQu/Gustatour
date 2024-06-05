//Imports pour Angular
import { Component, Inject, Input } from '@angular/core';

//Imports de components Angular
import { FormsModule } from '@angular/forms';

//Import de components Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';

//Import de services
import { CategoryService } from '../services/category.service';
import { MenuService } from '../services/menu.service';
import { ProductService } from '../services/product.service';
import { IngredientService } from '../services/ingredient.service';

//Import de modèles
import { Product } from '../models/product.model';
import { Menu } from '../models/menu.model';
import { Category } from '../models/category.model';
import { Ingredient } from '../models/ingredient.model';
import { TypeOfIngredient } from '../models/type-of-ingredient.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIcon,
    MatSlideToggleModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  @Input() product!: Product;
  oldProduct !: Product;

  menus!: Menu[];

  categories!: Category[];

  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService,
    public matDialog: MatDialog,
    private productService: ProductService
  ){ }

  ngOnInit(){
    this.categoryService.getAll()
    .subscribe((data:any)=>{
      this.categories = data;
    })

    this.menuService.getAll()
    .subscribe((data:any)=>{
      this.menus = data;
    })

    this.oldProduct = { ...this.product };
  }

  public compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  public checkUpdates(): boolean{
    return (this.product.name != this.oldProduct.name)
    ||(this.product.available != this.oldProduct.available)
    ||(this.product.category.id != this.oldProduct.category.id)
    ||(this.product.menu != this.oldProduct.menu)
    ||(this.product.price != this.oldProduct.price)
    ||(this.product.ingredients != this.oldProduct.ingredients)
  }

  public openDeleteDialog() {
    const dialogRef = this.matDialog.open(deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      result ? this.productService.delete(this.product) : console.log(this.product.name + " non supprimé.e");
    });
  }

  public openRecipeDialog(product:Product) {
    const dialogRef = this.matDialog.open(recipeDialog, {
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? console.log('produit modifié') : this.product.ingredients = {...this.oldProduct.ingredients};
    });
  }

  public updateProduct(){
    this.productService.update(this.product);
    this.oldProduct = { ...this.product };
  }
}

//Component pour la boîte de dialogue lors d'une supression de produit
@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
})
export class deleteDialog {
}

//Component pour la boîte de dialogue de modification d'une recette
@Component({
  selector: 'recipe-dialog',
  templateUrl: 'recipe-dialog.html',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatRadioModule,
    MatDividerModule,
    MatSelectModule,
    
  ],
})
export class recipeDialog {
  ingredients!: Ingredient[];
  typesOfIngredient : TypeOfIngredient[] = [];

  @Input() product!: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ingredientService: IngredientService
  ) {
    this.product = data.product;
  }

  ngOnInit(){
    this.ingredientService.getAll()
    .subscribe((data:Ingredient[])=>{
      this.ingredients = data;

      this.ingredients.forEach(ingredient =>{
        if(!this.typesOfIngredient.find(typeOfIngredient=> typeOfIngredient.name === ingredient.typeOfIngredient.name)) {
          this.typesOfIngredient.push(ingredient.typeOfIngredient);
        }
      });
    });
  }

  public compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
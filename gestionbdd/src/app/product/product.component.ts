// Imports pour Angular
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';

// Imports de composants Angular
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

// Imports de composants Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Imports de services
import { CategoryService } from '../services/category.service';
import { MenuService } from '../services/menu.service';
import { ProductService } from '../services/product.service';
import { IngredientService } from '../services/ingredient.service';

// Imports de modèles
import { Product } from '../models/product.model';
import { Menu } from '../models/menu.model';
import { Category } from '../models/category.model';
import { Ingredient } from '../models/ingredient.model';
import { TypeOfIngredient } from '../models/type-of-ingredient.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    MatDialogModule,
    ProductComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() allProducts!: Product[];
  oldProduct !: Product;
  menus!: Menu[];
  categories!: Category[];

  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService,
    public matDialog: MatDialog,
    private productService: ProductService
  ){}

  // Initialisation des données lors du chargement du composant
  ngOnInit(){
    this.categoryService.getAll()
    .subscribe((data:any)=>{
      this.categories = data;
    })

    this.menuService.getAll()
    .subscribe((data:any)=>{
      this.menus = data;
    })

    this.oldProduct = JSON.parse(JSON.stringify(this.product));
  }

  // Comparaison des objets par ID
  public compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  // Vérification des mises à jour sur le produit
  public checkUpdates(): boolean {
    return (this.product.name != this.oldProduct.name)
    || (this.product.available != this.oldProduct.available)
    || (!this.compareObjects(this.product.category, this.oldProduct.category))
    || (this.product.menu && this.oldProduct.menu && this.product.menu.id != this.oldProduct.menu.id)
    || (this.product.price != this.oldProduct.price)
    || (!this.ingredientComparison(this.product.ingredients, this.oldProduct.ingredients));
  }

  private ingredientComparison(a: Ingredient[], b: Ingredient[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // Vérifier que chaque ingrédient de `a` est présent dans `b`
    for (let i = 0; i < a.length; ++i) {
      if (!b.some(ingredient => ingredient.id === a[i].id)) return false;
    }
    
    // Vérifier que chaque ingrédient de `b` est présent dans `a`
    for (let i = 0; i < b.length; ++i) {
      if (!a.some(ingredient => ingredient.id === b[i].id)) return false;
    }
  
    return true;
  }

  // Ouvrir le dialogue de suppression
  public openDeleteDialog() {
    const dialogRef = this.matDialog.open(deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.productService.delete(this.product)
        .subscribe();
      }
    });
  }

  // Ouvrir le dialogue de recette
  public openRecipeDialog(product: Product) {
    const dialogRef = this.matDialog.open(recipeDialog, {
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.product = JSON.parse(JSON.stringify(this.oldProduct));
      }
    });
  }

  // Mettre à jour le produit
  public updateProduct(){
    this.productService.update(this.product);
    this.oldProduct = JSON.parse(JSON.stringify(this.product));
  }
}

// Composant pour la boîte de dialogue lors d'une suppression de produit
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

// Composant pour la boîte de dialogue de modification d'une recette
@Component({
  selector: 'recipe-dialog',
  templateUrl: 'recipe-dialog.html',
  styleUrl: './product.component.scss',
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
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule
  ],
})
export class recipeDialog {
  menus!: Menu[];
  ingredients!: Ingredient[];
  filteredIngredients!: Observable<Ingredient[] | string[]>;
  typesOfIngredient: TypeOfIngredient[] = [];
  ingredientControl = new FormControl('');
  @ViewChild('ingredientInput') ingredientInput!: ElementRef<HTMLInputElement>;
  product!: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ingredientService: IngredientService,
    private menuService: MenuService
  ) {
    this.product = data.product;
  }

  // Initialisation des données lors du chargement du composant
  ngOnInit(){
    this.ingredientService.getAll()
    .subscribe((data: Ingredient[]) => {
      this.ingredients = data;

      this.ingredients.forEach(ingredient => {
        if(!this.typesOfIngredient.find(typeOfIngredient => typeOfIngredient.id === ingredient.typeOfIngredient.id)) {
          this.typesOfIngredient.push(ingredient.typeOfIngredient);
        }
      });
    });

    this.menuService.getAll()
    .subscribe((data: Menu[]) => {
      this.menus = data;
    });
  }

  // Comparaison des objets par ID
  public compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  // Supprimer un ingrédient de la liste des ingrédients du produit
  remove(ingredient: Ingredient): void {
    const index = this.product.ingredients.indexOf(ingredient);
    if (index >= 0) {
      this.product.ingredients.splice(index, 1);
    }
  }

  // Vérification de la présence d'un ingrédient dans le produit
  public checkIngredients(ingredient: Ingredient): boolean {
    return !!this.product.ingredients.find(productIngredient => productIngredient.id === ingredient.id);
  }

  // Ajouter ou retirer un ingrédient de la liste des ingrédients du produit
  public toggleIngredientToProduct(ingredient: Ingredient): void {
    if (!this.checkIngredients(ingredient)) {
      this.product.ingredients.push(ingredient);
    } else {
      this.product.ingredients.splice(this.product.ingredients.indexOf(ingredient), 1);
    }
  }
}

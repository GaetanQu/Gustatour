// Imports pour Angular
import { Component, ViewChild } from '@angular/core';

// Imports de dk Angular
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

// Imports Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Imports de modèles
import { Ingredient } from '../../models/ingredient.model';
import { TypeOfIngredient } from '../../models/type-of-ingredient.model';
import { Allergene } from '../../models/allergene.model';

// Imports de services
import { IngredientService } from '../../services/ingredient.service';
import { AllergenesService } from '../../services/allergenes.service';
import { CompareObjectsService } from '../../services/compare-objects.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [
    MatTableModule,
    MatSlideToggleModule,
    FormsModule,
    MatSortModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
  typesOfIngredient!: TypeOfIngredient[];
  allergenes!: Allergene[];
  typeOfIngredientFilter: string = 'all';
  searchFilter: string = '';

  // Ordre d'affichages des collonnes du tableau
  displayedColumns: string[] = ['edit', 'name', 'type', "allergenes", 'available', 'delete'];

  // Création du tableau Material contenant les ingrédients
  ingredientSource: MatTableDataSource<Ingredient> = new MatTableDataSource<Ingredient>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ingredientService: IngredientService,
    private allergeneService: AllergenesService,
    public compareObjectsService: CompareObjectsService,
    public matDialog: MatDialog,
  ){ }

  ngOnInit() {
    this.typesOfIngredient = [];
    
    // Obtention de tous les ingrédients possibles
    this.ingredientService.getAll()
      .pipe(take(1))
      .subscribe((data: Ingredient[]) => {
        this.ingredientSource.data = data;

        // Création de la liste de types d'ingrédients
        data.forEach(ingredient => {
          if (!this.typesOfIngredient.find(typeOfIngredient => typeOfIngredient.name === ingredient.typeOfIngredient.name)) {
            this.typesOfIngredient.push(ingredient.typeOfIngredient);
          }
        });

        // Définition du prédicat de filtre de la table
        this.ingredientSource.filterPredicate = (data: Ingredient, filter: string) => {
          const [typeOfIngredientFilter, searchFilter] = filter.split('$');

          let matchNames: boolean;
          let matchTypes: boolean;
          
          if(searchFilter) {
            matchNames = data.name.toLowerCase().trim().includes(searchFilter);
          }
          else {
            matchNames = true;
          }

          if(typeOfIngredientFilter != "all") {
            matchTypes = data.typeOfIngredient.name.toLowerCase().includes(typeOfIngredientFilter)
          }
          else {
            matchTypes = true;
          }

          return matchNames && matchTypes;
        };
        this.ingredientSource.sort = this.sort;
      });

      // Obtention de tous les allergènes possibles
      this.allergeneService.getAll()
      .pipe(take(1))
      .subscribe((data: Allergene[]) => {
        this.allergenes = data;
      });
  }

  // Filtrage des ingrédients selon leur type et leur nom
  filterIngredient(typeOfIngredientFilter: string, searchFilter: string): void {
    // Concatène les filtres de type et de recherche séparés par un "$"
    const filterValue = `${typeOfIngredientFilter.trim().toLowerCase()}$${searchFilter.trim().toLowerCase()}`;
    this.ingredientSource.filter = filterValue;
  }

  // Activation de l'édition d'un ingrédient
  editIngredient(ingredient: Ingredient) {
    ingredient.isEditing = true;
  }

  // Enregistrement des modifications d'un ingrédient
  saveIngredient(ingredient: Ingredient) {
    this.ingredientService.update(ingredient);
    ingredient.isEditing = false;
  }

  // Vérification de la sélection d'un allergène présent dans un ingrédient
  selectAllergene(ingredient: Ingredient, allergene: Allergene) {
    return ingredient.allergenes.some(ingredientAllergene => ingredientAllergene.id === allergene.id && ingredientAllergene.name === allergene.name);
  }

  // Suppression d'un ingrédient
  public deleteIngredient(deletedIngredient: Ingredient) {
    const dialogRef = this.matDialog.open(DeleteIngredientDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.ingredientService.delete(deletedIngredient)
        .pipe(
          take(1)
        )
        .subscribe(
          () => {
            const updatedIngredientSourceData = this.ingredientSource.data;
            updatedIngredientSourceData.splice(this.ingredientSource.data.findIndex(ingredient => ingredient.id === deletedIngredient.id), 1);

            this.ingredientSource.data = [... updatedIngredientSourceData];
            
          }
        );
      }
    })
  }
}

@Component({
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "deleteIngredientDialog.html",
  styleUrl: "ingredients.component.scss"
})

export class DeleteIngredientDialog {
  constructor(){}
}
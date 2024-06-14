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
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Imports de modèles
import { Ingredient } from '../models/ingredient.model';
import { TypeOfIngredient } from '../models/type-of-ingredient.model';
import { Allergene } from '../models/allergene.model';

// Imports de services
import { IngredientService } from '../services/ingredient.service';
import { AllergenesService } from '../services/allergenes.service';
import { CompareObjectsService } from '../services/compare-objects.service';


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
    MatIcon,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
  typesOfIngredient!: TypeOfIngredient[];
  allergenes!: Allergene[];
  typeOfIngredientFilter: string = 'all';
  searchFilter: string = '';

  displayedColumns: string[] = ['edit', 'name', 'type', "allergenes", 'available'];
  ingredientSource: MatTableDataSource<Ingredient> = new MatTableDataSource<Ingredient>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ingredientService: IngredientService,
    private allergeneService: AllergenesService,
    public compareObjectsService: CompareObjectsService,
  ){ }

  ngOnInit() {
    // Initialisation des types d'ingrédients et des allergènes
    this.typesOfIngredient = [];
    
    this.ingredientService.getAll()
      .pipe(take(1))
      .subscribe((data: Ingredient[]) => {
        this.ingredientSource.data = data;

        data.forEach(ingredient => {
          if (!this.typesOfIngredient.find(typeOfIngredient => typeOfIngredient.name === ingredient.typeOfIngredient.name)) {
            this.typesOfIngredient.push(ingredient.typeOfIngredient);
          }
        });

        // Définir le filtre de la table
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

          console.log(typeOfIngredientFilter)
          return matchNames && matchTypes;
        };
        this.ingredientSource.sort = this.sort;
      });

    this.allergeneService.getAll()
      .pipe(take(1))
      .subscribe((data: Allergene[]) => {
        this.allergenes = data;
      });
  }

  // Filtrer les ingrédients selon leur type et leur nom
  filterIngredient(typeOfIngredientFilter: string, searchFilter: string): void {
    const filterValue = `${typeOfIngredientFilter.trim().toLowerCase()}$${searchFilter.trim().toLowerCase()}`;
    this.ingredientSource.filter = filterValue;
  }

  // Activer l'édition d'un ingrédient
  editIngredient(ingredient: Ingredient) {
    ingredient.isEditing = true;
  }

  // Enregistrer les modifications d'un ingrédient
  saveIngredient(ingredient: Ingredient) {
    this.ingredientService.update(ingredient);
    ingredient.isEditing = false;
  }

  // Vérifier si un allergène est sélectionné pour un ingrédient
  selectAllergene(ingredient: Ingredient, allergene: Allergene) {
    return ingredient.allergenes.some(ingredientAllergene => ingredientAllergene.id === allergene.id && ingredientAllergene.name === allergene.name);
  }
}

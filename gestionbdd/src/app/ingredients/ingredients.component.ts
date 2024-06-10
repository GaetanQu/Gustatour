//Imports pour Angular
import { Component, ViewChild } from '@angular/core';

//Imports de composants Angular
import { FormsModule } from '@angular/forms';

//Imports Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';

//Imports de modèles
import { Ingredient } from '../models/ingredient.model';

//Imports de services
import { IngredientService } from '../services/ingredient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TypeOfIngredient } from '../models/type-of-ingredient.model';
import { AllergenesService } from '../services/allergenes.service';
import { Allergene } from '../models/allergene.model';


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
  searchTerm!: string;

  displayedColumns: string[] = ['edit', 'name', 'type', "allergenes", 'available'];
  ingredientSource : MatTableDataSource<Ingredient> = new MatTableDataSource<Ingredient>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ingredientService: IngredientService,
    private allergeneService: AllergenesService
  ){ }

  ngOnInit(){
    this.typesOfIngredient = [];
    this.ingredientService.getAll()
    .subscribe((data:Ingredient[])=>{
      this.ingredientSource.data = data;

      data.forEach(ingredient =>{
        if (!this.typesOfIngredient.find(typeOfIngredient => typeOfIngredient.name === ingredient.typeOfIngredient.name)) {
          this.typesOfIngredient.push(ingredient.typeOfIngredient);
        }
      });

      this.ingredientSource.filterPredicate = (data: Ingredient, filter: string) => {
        return data.typeOfIngredient.name.toLowerCase().includes(filter);
      };
    });

    this.allergeneService.getAll()
    .subscribe((data:Allergene[])=>{
      this.allergenes = data;
    })

  }

  ngAfterViewInit(): void {
    this.ingredientSource.sort = this.sort;
  }

  filterIngredientsByType(type: { name: string }): void {
    this.ingredientSource.filter = type.name.trim().toLowerCase();
  }

  filterIngredientsByName(): void{
    this.ingredientSource.filter = this.searchTerm.toLowerCase();
  }

  clearfilter(){
    this.ingredientSource.filter = '';
  }

  editIngredient(ingredient:Ingredient){
    ingredient.isEditing = true;
  }

  saveIngredient(ingredient:Ingredient){
    this.ingredientService.update(ingredient);
    ingredient.isEditing = false;
  }

  selectAllergene(ingredient: Ingredient, allergene: Allergene) {
    return ingredient.allergenes.some(a => a.id === allergene.id && a.name === allergene.name);
}

  public compareObjects(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
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


@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [
    MatTableModule,
    MatSlideToggleModule,
    FormsModule,
    MatSortModule,
    MatChipsModule,
    MatFormFieldModule
  ],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
  displayedColumns: string[] = ['name', 'type', 'available'];
  typesOfIngredient!: string[];
  dataSource : MatTableDataSource<Ingredient> = new MatTableDataSource<Ingredient>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ingredientService: IngredientService,
  ){ }

  ngOnInit(){
    this.typesOfIngredient = [];
    this.ingredientService.getAll()
    .subscribe((data:Ingredient[])=>{
      this.dataSource.data = data;

      data.forEach(ingredient =>{
        if(!this.typesOfIngredient.includes(ingredient.typeOfIngredient.name)){
          this.typesOfIngredient.push(ingredient.typeOfIngredient.name);
        }
      });

      this.dataSource.filterPredicate = (data: Ingredient, filter: string) => {
        return data.typeOfIngredient.name.toLowerCase().includes(filter);
      };

    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filterIngredientsByType(query: string): void{
    this.dataSource.filter = query.trim().toLowerCase();
  }
}
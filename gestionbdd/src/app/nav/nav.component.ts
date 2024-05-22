//Imports pour Angular
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

//Imports de components Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

//Imports de component dev kits Angular Material
import { DragDropModule, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

//Imports de services
import { CategoryService } from '../services/category.service';

//Imports de modèles
import { Category } from '../models/category.model';

//Imports de components
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent {
  categories !: Category[];
  tables !: [];
  editingTitle!: boolean;
  opened : boolean = true;

  constructor(
    private categoryService: CategoryService,
    public appComponent: AppComponent
  ){ }

  ngOnInit(){
    this.categoryService.getAllSorted()
    .subscribe((data: any) =>{
      this.categories = data;
      this.categories = this.categories.sort((a,b)=>{
        return a.display_order - b.display_order;
      })
    });
  }

  //Capture le drop d'un Drag & Drop dans les catégories
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    console.log(this.categories);
    this.categories.forEach(category => {
      category.display_order = this.categories.indexOf(category);
    });
  }

  //Permet la modification d'un nom de catégorie
  public toggleEditingTitle(category: Category){
    category.editingTitle = !category.editingTitle;
  }

  //Modifie de manière effective le nom de la catégorie
  public editTitle(category: Category, newTitle: string){
    category.name = newTitle;
  }
}

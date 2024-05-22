//Imports pour Angular
import { Component, Input } from '@angular/core';

//Imports de components Angular
import { FormsModule } from '@angular/forms';

//Import de components Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

//Import de services
import { CategoryService } from '../services/category.service';
import { MenuService } from '../services/menu.service';

//Import de modèles
import { Product } from '../models/product.model';
import { Menu } from '../models/menu.model';
import { Category } from '../models/category.model';

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
  currentMenu!: Menu;

  categories!: Category[];
  currentCategory!: Category;

  constructor(private menuService: MenuService, private categoryService: CategoryService, public matDialog: MatDialog){ }

  ngOnInit(){
    this.categoryService.getAll()
    .subscribe((data:any)=>{
      this.categories = data;
    })
    this.currentCategory = this.product.category;

    this.menuService.getAll()
    .subscribe((data:any)=>{
      this.menus = data;
    })
    this.currentMenu = this.product.menu;

    this.oldProduct = { ...this.product };
  }

  public checkUpdates(): boolean{
    return (this.product.name != this.oldProduct.name)
    ||(this.product.available != this.oldProduct.available)
    ||(this.product.category != this.oldProduct.category)
    ||(this.product.menu != this.oldProduct.menu)
  }

  public openDialog() {
    const dialogRef = this.matDialog.open(deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

//Component pour la boîte de dialogue lors d'une supression de produit
@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class deleteDialog {
}
import { Routes } from '@angular/router';
import { ProductsComponent } from './content/products/products.component';
import { IngredientsComponent } from './content/ingredients/ingredients.component';
import { CategoriesComponent } from './content/categories/categories.component';
import { MenusComponent } from './content/menus/menus.component';

export const routes: Routes = [
    {path: '', redirectTo: '/products', pathMatch:"full"},
    {path: 'products', component: ProductsComponent},
    {path: 'ingredients', component: IngredientsComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'menus', component: MenusComponent}
];
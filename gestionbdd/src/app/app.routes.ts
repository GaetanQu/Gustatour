import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

export const routes: Routes = [
    {path: '', redirectTo: '/product', pathMatch:"full"},
    {path: 'product', component: ProductsComponent},
    {path: 'ingredient', component: IngredientsComponent},
];
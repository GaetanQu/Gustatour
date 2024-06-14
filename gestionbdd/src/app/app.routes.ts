import { Routes } from '@angular/router';
import { ProductsComponent } from './content/products/products.component';
import { IngredientsComponent } from './content/ingredients/ingredients.component';

export const routes: Routes = [
    {path: '', redirectTo: '/product', pathMatch:"full"},
    {path: 'product', component: ProductsComponent},
    {path: 'ingredient', component: IngredientsComponent},
];
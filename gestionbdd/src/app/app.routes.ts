import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {path: '', redirectTo: '/product', pathMatch:"full"},
    {path: 'product', component: ProductsComponent},
];
//Import pour Angular
import { Component } from '@angular/core';

//Imports de components Angular Material
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

//Imports de components
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    ProductsComponent,
    MatFormField,
    MatInputModule,
    MatIcon
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {
  constructor(){ }

  ngOnInit(){
  }
}

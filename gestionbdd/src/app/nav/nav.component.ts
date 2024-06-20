//Imports pour Angular
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

//Imports de components Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

//Imports de components
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent {
  constructor(
    public appComponent: AppComponent
  ){ }

  ngOnInit(){
  }
}

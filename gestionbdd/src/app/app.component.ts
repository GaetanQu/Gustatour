//Imports pour Angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//Imports de components Angular Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//Imports de components
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    HeaderComponent,
    MatGridListModule,
    ContentComponent,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestionbdd';
  isExpanded: boolean = false;

  constructor(){ }

  //Ouvre ou ferme la sidenav
  public toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  public closeSidenav() {
    this.isExpanded = false;
  }
}

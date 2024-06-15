import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { map, take } from 'rxjs';
import { Category } from '../models/category.model';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  categories !: Category[];

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories()
    .pipe(
      take(1),
      map((data: Category[])=>{
        return data.map(category => ({
          name: category.name,
          display_order: category.display_order
        }))
      })
    )
    .subscribe((data: Category[])=>{
      this.categories = data;
    });
  }
}

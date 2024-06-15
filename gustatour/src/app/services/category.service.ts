import { Injectable } from '@angular/core';
import { BddApiService } from './bdd-api.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private bddApiService: BddApiService,
  ) { }

  public getCategories(): Observable<Category[]> {
    return this.bddApiService.getCall("category/filteredAndSorted");
  }
}

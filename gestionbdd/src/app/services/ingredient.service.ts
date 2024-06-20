import { Injectable } from '@angular/core';
import { BddApiService } from './bdd-api.service';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private bddApiService: BddApiService) { }

  public getAll():Observable<any>{
    return this.bddApiService.getCall('ingredient/all');
  }

  public update(ingredient: Ingredient) {
    return this.bddApiService.putSend("ingredient/update/" + String(ingredient.id), ingredient).subscribe();
  }

  public delete(ingredient: Ingredient) {
    return this.bddApiService.postSend("ingredient/delete/" + ingredient.id, ingredient)
  }
}

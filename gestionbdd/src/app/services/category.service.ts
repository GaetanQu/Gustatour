import { Injectable } from '@angular/core';
import { BddApiService } from './bdd-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private bddApiService: BddApiService) { }

  //Récupère toutes les colonnes de la table categories
  public getAll(){
    return this.bddApiService.getCall("category/all");
  }

  public getAllSorted(){
    return this.bddApiService.getCall("category/all")
  }
}

import { Injectable } from '@angular/core';
import { BddApiService } from './bdd-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private bddApiService: BddApiService) { }

  //Récupère toutes les colonnes de la table products
  public getAll(): Observable<any[]>{
    return this.bddApiService.getCall("product/all");
  }
}

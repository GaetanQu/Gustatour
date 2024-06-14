import { Injectable } from '@angular/core';
import { BddApiService } from './bdd-api.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private bddApiService: BddApiService) { }

  //Récupère toutes les colonnes de la table products
  public getAll(): Observable<any[]>{
    return this.bddApiService.getCall("product/all");
  }

  //Ajoute un produit à la bdd
  public add(product: Product): Observable<void> {
    console.log(product);
    return this.bddApiService.postSend("product/add", product);
  }

  //Met à jour un produit dans la bdd
  public update(product: Product) {
    return this.bddApiService.putSend("product/update/" + String(product.id), product).subscribe();
  }

  //Supprime un produit de la bdd
  public delete(product: Product) {
    return this.bddApiService.putSend("product/delete/" + String(product.id), product);
  }
}

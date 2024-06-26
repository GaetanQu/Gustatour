import { Injectable } from '@angular/core';
import { BddApiService } from './bdd-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private bddApiService: BddApiService) { }

  public getAll():Observable<any[]>{
    return this.bddApiService.getCall("menu/all")
  }
}

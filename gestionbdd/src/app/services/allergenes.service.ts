import { Injectable } from '@angular/core';
import { BddApiService } from './bdd-api.service';

@Injectable({
  providedIn: 'root'
})
export class AllergenesService {

  constructor(private bddApiService:BddApiService) { }

  public getAll(){
    return this.bddApiService.getCall("allergene/all")
  }
}

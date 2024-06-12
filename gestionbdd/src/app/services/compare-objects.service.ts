import { Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class CompareObjectsService {
    public compareIngredients(ing1: Ingredient, ing2: Ingredient): boolean {
        if(ing1 && ing2) {
            return ing1 === ing2
        }
        else {
            return false
        }
    }
}
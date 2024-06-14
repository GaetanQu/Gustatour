import { Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { Menu } from "../models/menu.model";

@Injectable({
    providedIn: 'root'
})
export class CompareObjectsService {
    public compareIngredients(ing1: Ingredient, ing2: Ingredient): boolean {
        if(ing1 && ing2) {
            return ing1 === ing2;
        }
        else {
            return false;
        }
    }

    public compareMenus(men1: Menu, men2: Menu) :boolean {
        if(men1 && men2) {
            return men1 === men2;
        }
        else {
            return false;
        }
    }
}
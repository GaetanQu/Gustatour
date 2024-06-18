import { Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { Menu } from "../models/menu.model";
import { Category } from "../models/category.model";

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
            return men1 === men2 || men1.id === men2.id;
        }
        else {
            return false;
        }
    }

    public compareCategories(cat1: Category, cat2: Category): boolean {
        if(cat1 && cat2) {
            return cat1 === cat2 || cat1.id === cat2.id;
        }
        else {
            return false;
        }
    }
}
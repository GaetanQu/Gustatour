import { Category } from "./category.model";
import { Ingredient } from "./ingredient.model";
import { Menu } from "./menu.model";

export class Product{
    id?: number;
    name!: string;
    image_link!: string;
    category!: Category;
    menu!: Menu;
    available!: boolean;
    price!: number;
    ingredients!: Ingredient[];
}
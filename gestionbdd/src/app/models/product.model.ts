import { Category } from "./category.model";
import { Menu } from "./menu.model";

export class Product{
    id!: number;
    name!: string;
    image_name!: string;
    category!: Category;
    menu!: Menu;
    available!: boolean;
}
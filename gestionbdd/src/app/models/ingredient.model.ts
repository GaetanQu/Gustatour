import { Allergene } from "./allergene.model";
import { TypeOfIngredient } from "./type-of-ingredient.model";

export class Ingredient{
    id?: number;
    name!: string;
    typeOfIngredient!: TypeOfIngredient;
    available!: boolean;
    allergenes!: Allergene[];
    isEditing: boolean = false;
}
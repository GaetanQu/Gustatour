import { TypeOfIngredient } from "./type-of-ingredient.model";

export class Ingredient{
    id!: number;
    name!: string;
    typeOfIngredient!: TypeOfIngredient;
    available!: boolean;
}
export class Category{
  id!:number;
  name!: string;
  display_order!: number;
  available!: boolean;

  editingTitle: boolean = false;
}
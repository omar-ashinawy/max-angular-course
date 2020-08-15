import {Action} from "@ngrx/store";
import {IngredientModel} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action{
  readonly type = ADD_INGREDIENT;
  constructor(public payload: IngredientModel) {}
 //payload is not required by action interface.
}

export class AddIngredients implements Action{
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: IngredientModel[]) {}
}

export class UpdateIngredients implements Action{
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: {index: number, newIngredient: IngredientModel}) {}
}

export class DeleteIngredients implements Action{
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export class StartEdit implements Action{
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action{
  readonly type = STOP_EDIT;
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredients | DeleteIngredients | StartEdit | StopEdit ;

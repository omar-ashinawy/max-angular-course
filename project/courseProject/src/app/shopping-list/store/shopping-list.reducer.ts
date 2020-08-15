import {IngredientModel} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: IngredientModel[];
  editedIngredient: IngredientModel;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};


export function shoppingListReducer(state:State = initialState, action: ShoppingListActions.ShoppingListActions) {
  // reducer returns a modified copy of the state to the store
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const oldIngredient = state.ingredients[action.payload.index];
      const newIngredient = action.payload.newIngredient;
      const updatedIngredient = {
        ...oldIngredient,
        ...newIngredient
      };
      let updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: [...updatedIngredients],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, ingIndex) => {
          return ingIndex !== action.payload;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}

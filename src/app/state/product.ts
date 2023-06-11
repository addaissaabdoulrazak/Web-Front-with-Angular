
//Enum ProductActionsTypes to better manage your event
 //here, we are talking about(these are) << il s'agit >> the differents Action Type
export enum ProductActionsTypes{
  GET_ALL_PRODUCTS = "[Product] Get All Products" ,
  GET_SELECTED_PRODUCTS = "[Product] Get Selected Products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get Available Products",
  SEARCH_PRODUCTS = "[Product] Search Products",
  NEW_PRODUCT = "[Product] New Products",
  SELECT_PRODUCTS="[Product] Select Products",
  EDIT_PRODUCTS = "[Product] Edit Product",
  DELETE_PRODUCTS ="[Product] Delete Product"
}


/** 
  * an Evenement represents one(one and only one) action. the concern is that we have differents type of Action(several see Above)
  *You have to encapsulate things. you encapsulate all differents type of Action into a class(Enum).

  *@payload type is "any" because "any" is used to represent a variable or parameter that can have any type
  *@payload is an parameter can be either a string, Object(Product) if insert request either number(Id) if delete request, string if research 

**/


export interface ActionEvent{

  type : ProductActionsTypes,


  payload ?: any
  
}


export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR
}

//l'état des données de l'application(AppDataState)
/*nullable because sometimes I can to create an Objects that contains 
   -either dataState only 
   -or two attribut
   -or three attribut */
export interface AppDataState<T>{

  dataState? : DataStateEnum,

  data? : T

  ErrorMessage?:string
}



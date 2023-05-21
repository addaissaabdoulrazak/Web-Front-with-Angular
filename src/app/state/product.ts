export enum ProductActionsTypes{
  
  GET_ALL_PRODUCTS = "[Product] Get All Products" ,
  GET_SELECTED_PRODUCTS = "[Product] Get Selected Products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get Available Products",
  SEARCH_PRODUCTS = "[Product] Search Products",
  NEW_PRODUCT = "[Product] New Products",

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



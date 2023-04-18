export enum DataStateEnum{
    LOADING,
    LAODED,
    ERROR
}

//l'état des données de l'application(AppDataState)
export interface AppDataState<T>{

  dataState? : DataStateEnum,

  data? : T

  ErrorMessage?:string
}

export interface Product {
}

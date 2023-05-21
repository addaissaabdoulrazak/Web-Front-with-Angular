
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




export type KeyFormat<Provider extends string, Values extends string> = `${Provider}_${Values}`

/**
 * @EntityDefinition
 *  - Espera receber dois parâmetros: T e K
 *  @T -> EntityName = string 
 *  @K -> CollectionDefinition = [<collectionName = string>, <collectionInterface>] 
 */

export interface EntityDefinition<T extends string = string, K extends [string, unknown] = [string, any]> {
  /**
   * @provider = nome da entidade 
   */
  provider: T;
  collectionName: K[0]; // campo que determina as coleções dentro de um provedor
  documentId: string
  // options é fundamental para criar um objeto dentro da definição do provedor que contém informações de todos as tipagens dos documentos que o provedor consegue lidar
  options: {
    [Key in K as Key[0]]: Key[1]
  }
}


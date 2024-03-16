import { Firestore } from "firebase/firestore";
import { KeyFormat, EntityDefinition } from "./interface";
import Queries from "./queries";
/** 
 * @Entity 
 *  - é uma camada de abstração que possui a faculdade de administrar um conjunto específico 
 *    de coleções e seus respectivos documentos.
 * 
 *  - A nomenclatura das coleções segue um padrão formado pela concatenação
 *    do nome da entidade com o nome da própria coleção. Isso fornece uma estrutura clara para identificar 
 *    as coleções associadas a uma entidade específica: <entityName>_<collectionName>
 */
export default class Entity<P extends EntityDefinition<string, any> = EntityDefinition<string, any>, Op = P["options"]> {
  private _query: Queries

  /**
   * 
   * @param _name nome do entidade 
   * @param firestore instância do firebase 
   */
  constructor(private _name: P["provider"], firestore?: Firestore) {
    this._query = new Queries(firestore)
  }

  public setFirestore(firestore: Firestore) {
    this._query.setFirestore(firestore)
  }


  public get name() { return this._name }


  /**
   * 
   * @param collection identificador único da coleção
   * @param documentId identificador do documento 
   * @returns 
   */
  async get<C extends P["collectionName"] = P["collectionName"]>(collection: C, documentId: string): Promise<Op[C] | undefined> {
    if (!this._query) throw new Error(`firestore must be set at: ${this.name}`,)
    if (!collection || !documentId) return undefined
    const collectionName = this._normalizeCollectionName(collection)
    return await this._query.getDocument<Op[C]>(collectionName, documentId) as Op[C]
  }

  /**
   * obter detalhes de um documento específico, substituindo os IDs de referência por objetos reais
   * @param collection identificador único da coleção
   * @param documentId identificador do documento 
   * @returns 
   */
  async getDetails<C extends P["collectionName"] = P["collectionName"]>(collection: C, documentId: string): Promise<Op[C] | undefined> {
    if (!this._query) throw new Error(`firestore must be set at: ${this.name}`,)

    const doc = await this.get<C>(collection, documentId)

    if (!doc) return undefined

    const fieldsRefs = Object.keys(doc).filter(ref => ref.includes("_"))

    let newDoc: Record<string, any> = {}
    await Promise.all(fieldsRefs.map(async ref => {
      const refsValues = (doc as any)[ref]
      if (refsValues && Array.isArray(refsValues) && refsValues.length) {
        newDoc[ref] = await Promise.all(refsValues.map(async value => {
          if (!this._query) throw new Error(`firestore must be set at: ${this.name}`,)
          return await this._query.getDocument(ref, value)
        }))
        return { [ref]: doc }
      }
    }))
    return {
      ...doc,
      ...newDoc
    } as Op[C]
  }

  /**
   * 
   * @param collection 
   * @returns 
   */
  async values<C extends P["collectionName"]>(collection: C) {
    if (!this._query) throw new Error(`firestore must be set at: ${this.name}`,)
    const collectionName = this._normalizeCollectionName(collection)
    return await this._query.getCollection(collectionName) as Op[C][]
  }

  /**
   * 
   * @param collection identificador único da coleção
   * @param documentId identificador do documento 
   * @param document 
   * @returns 
   */
  async set<C extends P["collectionName"]>(
    collection: C,
    documentId: string,
    document: Omit<Op[C], "id" | "createdAt" | "updatedAt">
  ) {
    if (!this._query) throw new Error(`firestore must be set at: ${this.name}`,)
    if (!collection || !documentId || !document) return undefined

    const newDoc = {
      ...document,
      id: documentId,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    } as Op[C]
    await this._query.processDocumentReferences<typeof document>(this._name, documentId, newDoc)

    const collectionName = this._normalizeCollectionName(collection)
    return await this._query.setDocument<Op[C]>(
      collectionName,
      newDoc as Op[C]
    )
  }

  /**
   * 
   * @param collection identificador único da coleção
   * @param documentId identificador do documento 
   * @param document 
   * @param provider 
   * @returns 
   */
  async update<C extends P["collectionName"]>(
    collection: C,
    documentId: string,
    document: Omit<Partial<Op[C]>, "id" | "createdAt" | "updatedAt">,
    provider?: string
  ) {
    if (!this._query) throw new Error(`firestore must be set at: ${this.name}`,)
    if (!documentId) return undefined

    await this._query.processDocumentReferences<typeof document>(this._name, documentId, document as Op[C])

    const collectionName = this._normalizeCollectionName(collection, provider)
    const newDoc = {
      ...document,
      updatedAt: new Date().toDateString()
    }
    return await this._query.updateDocument(collectionName, documentId, newDoc)
  }

  /**
   * 
   * @param collection identificador único da coleção
   * @param documentId identificador do documento 
   * @returns 
   */
  async delete<C extends P["collectionName"]>(collection: C, documentId: string) {
    if (!this._query) throw new Error(`firestore must be set at: ${this.name}`,)
    if (!documentId) return undefined
    const collectionName = this._normalizeCollectionName(collection)
    return await this._query.deleteDocument(collectionName, documentId)
  }

  /**
   * 
   * @param collectionName 
   * @param provider 
   * @returns 
   */
  private _normalizeCollectionName(collection: string, provider: string = this._name): string {
    const collectionName = String(collection)
    const formatedName: KeyFormat<P["provider"], typeof collectionName> = `${provider}_${collectionName}`
    return formatedName
  }
}
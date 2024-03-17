import { Firestore, WriteBatch, writeBatch } from "firebase/firestore";
import { createDocument, deleteDocument, documentArrPush, getCollection, getDocument, getDocumentsWhere, incrementDocumentValue, updateDocument } from "./snippets";
import { memoize, clear, Cache, GlobalCache }from "@pytsx/system"

export default class Queries {
  private firestore: Firestore | undefined
  constructor(firestore: Firestore) {
    if (firestore) {
      this.firestore = firestore
    }
  }

  setFirestore(firestore: Firestore) { this.firestore = firestore }

  @memoize(Cache.GetConfig(GlobalCache))
  async getDocument<D>(collectionName: string, documentId: string): Promise<D | undefined> {
    if (!this.firestore || !collectionName || !documentId) return undefined
    try {
      return await getDocument(this.firestore, collectionName, documentId) as D
    } catch (error) {
      console.error(`🔴 falha ao -- recuperar documento -- ${document} em ${collectionName}: `, error)
      return undefined
    }
  }

  @memoize(Cache.GetConfig(GlobalCache))
  async getCollection<C>(collectionName: string): Promise<C | undefined> {
    if (!this.firestore || !collectionName) return undefined
    try {
      return await getCollection(this.firestore, collectionName) as C
    } catch (error) {
      console.error(`🔴 falha ao -- recuperar coleção -- ${document} em ${collectionName}: `, error)
      return undefined
    }
  }

  @memoize(Cache.GetConfig(GlobalCache))
  async getDocumentsWhere<C>(collectionName: string, props: Record<string, any>): Promise<C[] | undefined> {
    if (!this.firestore || !collectionName || !props) return undefined
    try {
      return await getDocumentsWhere(this.firestore, collectionName, props) as C[]
    } catch (error) {
      console.error(`🔴 falha ao -- recuperar documentos com filtro -- em ${collectionName}: `, error)
      return undefined
    }
  }

  async setDocument<D>(collectionName: string, document: D) {
    if (!this.firestore || !collectionName || !document) return undefined
    try {
      return await createDocument(this.firestore, collectionName, document) as D
    } catch (error) {
      console.error(`🔴 falha ao -- criar documento -- ${document} em ${collectionName}: `, error)
      return undefined
    }
  }

  async updateDocument<D extends Record<string, any>>(collectionName: string, documentId: string, document: D, banch?: WriteBatch): Promise<undefined | void> {
    if (!this.firestore || !collectionName || !documentId || !document) return undefined
    try {
      clear(this, this.getDocument, `${collectionName}:${documentId}`)
      return await updateDocument(this.firestore, collectionName, documentId, document, banch)
    } catch (error) {
      console.error(`🔴 falha ao -- atualizar documento -- ${document} em ${collectionName}: `, error)
      return undefined
    }
  }

  async deleteDocument(collectionName: string, documentId: string) {
    if (!this.firestore || !collectionName || !documentId) return undefined
    try {
      clear(this, this.getDocument, `${collectionName}:${documentId}`)
      return await deleteDocument(this.firestore, collectionName, documentId)
    } catch (error) {
      console.error(`🔴 falha ao -- deletar documento -- ${document} em ${collectionName}: `, error)
      return undefined
    }
  }

  async pushToDocumentArray(collectionName: string, documentId: string, key: string, value: any, batch: WriteBatch) {
    if (!this.firestore || !collectionName || !documentId || !key || !value) return undefined
    try {
      clear(this, this.getDocument, `${collectionName}:${documentId}`)
      return await documentArrPush(this.firestore, collectionName, documentId, key, value, batch)
    } catch (error) {
      console.error(`🔴 falha ao -- incrementar campo -- ${document} em ${collectionName}: `, error)
      return undefined
    }
  }

  async incrementDocumentValue(collectionName: string, documentId: string, key: string, incrementFactor: number = 1) {
    if (!this.firestore || !collectionName || !documentId || !key || !incrementFactor) return undefined
    try {
      clear(this, this.getDocument, `${collectionName}:${documentId}`)
      return await incrementDocumentValue(this.firestore, collectionName, documentId, key, incrementFactor)
    } catch (error) {
      console.error(`🔴 falha ao -- incrementar valor de documento -- em ${collectionName}: `, error)
      return undefined
    }
  }

  async processDocumentReferences<D extends { [key: string]: any }>(
    collectionRef: string,
    documentId: string,
    document: D
  ) {
    if (!this.firestore || !collectionRef || !documentId || !document) return undefined
    try {
      // Filtrar os campos que contêm referências
      const fieldsWithReferences = Object.keys(document).filter(el => el.includes("_"));

      // Verificar se há campos com referências
      if (fieldsWithReferences.length) {
        // Iniciar uma transação
        const batch = writeBatch(this.firestore)

        // Iterar pelos campos com referências usando um loop for...of
        for (let field of fieldsWithReferences) {
          /**
           * se o field incluir o valor "child" ("filho") significa que existe uma relação 1 pra muitos. 
           * Um "filho" possui um "parent" ("pai"), mas um "pai" 1 ou mais "filhos". 
           * Ou seja, o field possui como valor uma string que será anexada a uma array. 
           */
          const isChild = field.includes("child")
          /**
           * "values" possui a(s) referência(s) a serem acessadas e linkadas
           */
          const values = (document as any)[field];

          // Verificar se as referências são um array e se não estão vazias
          if (Array.isArray(values) && values.length) {
            // Iterar pelas referências e conectar cada uma delas à coleção correspondente
            for (let ref of values) {
              await this.pushToDocumentArray(field, ref, `${collectionRef}`, documentId, batch)
            }
          }
          else if (typeof values == "string") {
            if (isChild) {
              const normalizeField = field.split("_").filter(el => el !== "child").join("_")
              await this.pushToDocumentArray(normalizeField, values, `${collectionRef}`, documentId, batch)
            } else {
              await this.updateDocument(field, values, {
                [`${collectionRef}`]: documentId
              })
            }
          }
        }

        // Commit do lote após a conclusão de todas as operações
        await batch.commit() // enviar lote com alterações
      }
    } catch (error) {
      console.error(`🔴 falha ao -- processar referências do documento -- em ${collectionRef} -> ${documentId}: `, error)
      return undefined
    }
  }
}
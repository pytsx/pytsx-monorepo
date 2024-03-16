import { Firestore, WriteBatch, writeBatch } from "firebase/firestore";
import { createDocument, deleteDocument, documentArrPush, getCollection, getDocument, getDocumentsWhere, incrementDocumentValue, updateDocument } from "./snippets";
import { flattenObject } from "../utils";
import { memoize, clear, Cache, GlobalCache }from "@pytsx/system"

export default class Queries {
  private firestore: Firestore | undefined
  constructor(firestore?: Firestore) {
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

  async updateDocument<D extends Record<string, any>>(collectionName: string, documentId: string, document: D, banch?: WriteBatch) {
    if (!this.firestore || !collectionName || !documentId || !document) return undefined
    try {
      clear(this, this.getDocument, `${collectionName}:${documentId}`)

      return await updateDocument(this.firestore, collectionName, documentId, flattenObject(document), banch)
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
    providerName: string,
    documentId: string,
    document: D
  ) {
    if (!this.firestore || !providerName || !documentId || !document) return undefined
    try {
      // Filtrar os campos que contêm referências
      const fieldsWithReferences = Object.keys(document).filter(el => el.includes("_"));
      // Verificar se há campos com referências
      if (fieldsWithReferences.length) {
        // Iniciar uma transação
        const batch = writeBatch(this.firestore)

        // Iterar pelos campos com referências usando um loop for...of
        for (let field of fieldsWithReferences) {
          // Recuperar as referências do campo atual
          /**
           * Temos uma oportunidade para tipar o document, 
           * para isso precisamos de um local que armazena e conhece todos os tipos de documento,
           * é necessário portanto forncecer um contexto global contendo todos os nome com seus respectivos tipos 
           * dentro de uma variavel global acessivel em um escopo superior 
           */
          const references = (document as any)[field];
          // Verificar se as referências são um array e se não estão vazias
          if (Array.isArray(references) && references.length) {
            // Iterar pelas referências e conectar cada uma delas à coleção correspondente
            for (let ref of references) {
              await this.pushToDocumentArray(field, ref, `${providerName}_ref`, documentId, batch)
            }
          }
          else if (typeof references == "string") {
            await this.updateDocument(field, references, {
              [`${providerName}_ref`]: documentId
            })
          }
        }

        // Commit do lote após a conclusão de todas as operações
        await batch.commit() // enviar lote com alterações
      }
    } catch (error) {
      console.error(`🔴 falha ao -- processar referências do documento -- em ${providerName} -> ${documentId}: `, error)
      return undefined
    }
  }
}
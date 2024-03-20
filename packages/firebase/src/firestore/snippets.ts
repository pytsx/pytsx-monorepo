import { Firestore, Query, WhereFilterOp, WriteBatch, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, increment, query, setDoc, updateDoc, where } from "firebase/firestore"
import { flattenObject } from "../utils"

export async function getDocument(firestore: Firestore, collectionName: string, documentName: string) {
  try {
    const docRef = doc(firestore, collectionName, documentName)
    let document = await getDoc(docRef)
    if (!document.exists()) return false
    return { id: document.id, ...document.data() }
  } catch (error) {
    return false
  }
}
export async function getDocumentsWhere(firestore: Firestore, collectionName: string, props: Record<string, any>) {
  const ref = collection(firestore, collectionName)
  let q = query(ref)
  q = await applyQueryFilters(q, props, "==")

  const docs = await getDocs(q)

  return docs.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }))
}

export async function getCollection(firestore: Firestore, name: string) {
  if (!name) return []
  try {
    const collectionRed = collection(firestore, name as string)
    const q = query(collectionRed)
    const results = await getDocs(q)
    const data = results.docs.map(el => ({ id: el.id, ...el.data() }))
    return data
  } catch (error) {
    return false
  }
}

export async function deleteDocument(firestore: Firestore, collectionName: string, documentId: string) {
  const ref = doc(firestore, collectionName, documentId)
  return await deleteDoc(ref)
}

export async function incrementDocumentValue(firestore: Firestore, collectionName: string, documentName: string, key: string, incrementFactor: number = 1) {
  const ref = doc(firestore, collectionName, documentName)
  await updateDoc(ref, {
    [`${key}`]: increment(incrementFactor)
  })
}

export async function documentArrPush(firestore: Firestore, collectionName: string, documentName: string, key: string, value: any, batch?: WriteBatch) {
  const ref = doc(firestore, collectionName, documentName)
  const newValue = {
    [`${key}`]: arrayUnion(value)
  }

  if (batch) {
    batch.set(ref, newValue) // <-- aqui está removendo todas as referências do documento do db?
  } else {
    await updateDoc(ref, newValue)
  }
}

export async function createDocument(firestore: Firestore, collectionName: string, document: any) {
  try {
    const ref = doc(firestore, collectionName, document.id || document.uid)
    await setDoc(ref, document)
    return document
  } catch (error) {
    return false
  }
}

// para objetos animados, usar notação de ponto, ex: document.metadata.category 
export async function updateDocument(firestore: Firestore, collectionName: string, documentId: string, document: any, banch?: WriteBatch) {
  const ref = doc(firestore, collectionName, documentId)
  const flattenDoc = flattenObject(document)
  console.log("[debug] snippet updateDocument() flattenObject --> ", JSON.stringify(flattenDoc))
  if (banch) {
    banch.set(ref, flattenDoc)
  } else {
    return await updateDoc(ref, flattenDoc)
  }
}

async function applyQueryFilters<K>(q: Query, props: Partial<K>, whereFilterOp: WhereFilterOp = "==") {
  const key = Object.keys(props)[0]
  const value = Object.values(props)[0]

  if (key && value) {
    q = query(q, where(key, whereFilterOp, value))
  }

  return q
}

export async function getFilteredCollection<K>(firestore: Firestore, collectionName: string, filter: Partial<K>, whereFilterOp: WhereFilterOp = "=="): Promise<K[]> {
  let q = query(collection(firestore, collectionName))
  q = await applyQueryFilters(q, filter, whereFilterOp)
  const result = await getDocs(q)
  return result.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    } as K
  })
}
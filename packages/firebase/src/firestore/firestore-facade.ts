import { Firestore } from "firebase/firestore";
import { firestore } from "../firebase";

export class FirestoreFacade {
  protected firestore: Firestore = firestore
  constructor(_firestore?: Firestore) {
    if (_firestore) {
      this.firestore = _firestore
    }
  }
}
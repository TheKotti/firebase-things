import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query } from 'firebase/firestore'

export const getThingsByUser = (db: Firestore, uid: string): Promise<Thing[]> => {
  return new Promise((resolve, reject) => {
    const items: Thing[] = []
    const thingsRef = collection(db, `users/${uid}/things`)
    const q = query(thingsRef)
    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((x) => {
          const thing: Thing = x.data() as Thing
          thing.id = x.id
          items.push(thing)
        })
        resolve(items)
      })
      .catch(() => {
        console.error('No things found')
        reject([])
      })
  })
}

export const addNewThing = (db: Firestore, uid: string, newThing: Thing): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Send the new thing
    addDoc(collection(db, `users/${uid}/things`), newThing)
      .then((data) => {
        resolve(data.id)
      })
      .catch(() => {
        console.error('Adding new thing failed')
        reject()
      })
  })
}

export const deleteThing = (db: Firestore, uid: string, thingId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    deleteDoc(doc(db, `users/${uid}/things/${thingId}`))
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        console.error('Deleting thing failed')
        reject(false)
      })
  })
}

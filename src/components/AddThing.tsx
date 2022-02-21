import { useState } from 'react'
import { getFirestore, Timestamp } from 'firebase/firestore'

import { useFirebaseAuth } from '../hooks'
import { addNewThing } from '../api'

type Props = {
  addThingUI: (thing: Thing) => void
}

const AddThing = ({ addThingUI }: Props) => {
  const db = getFirestore()
  const { user } = useFirebaseAuth()
  const [newThing, setNewThing] = useState<Thing>({ title: '', url: '', tags: [] })

  // Add a new thing to the database
  const addThingToDatabase = () => {
    if (!user) return

    setNewThing({ ...newThing, timeStamp: Timestamp.now().toDate() })
    addNewThing(db, user.uid, newThing).then((data) => {
      addThingUI({ ...newThing, id: data })
    })
  }

  // Handle splitting tag list and setting it to state
  const handleTagsChange = (e: any) => {
    const tags = e.target.value.split(',').map((x: string) => x.toUpperCase())
    setNewThing({ ...newThing, tags })
  }

  return (
    <div>
      <input placeholder='TITLE' onChange={(e) => setNewThing({ ...newThing, title: e.target.value })} />
      <input placeholder='URL' onChange={(e) => setNewThing({ ...newThing, url: e.target.value })} />
      <input placeholder='TAGS' onChange={handleTagsChange} />
      <button onClick={addThingToDatabase}>Add thing</button>
    </div>
  )
}

export default AddThing

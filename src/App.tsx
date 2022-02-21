import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

import SignOut from './components/SignOut'
import SignIn from './components/SignIn'
import { useFirebaseAuth } from './hooks'
import ThingMain from './components/ThingMain'
import AddThing from './components/AddThing'
import { getThingsByUser } from './api'

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
})
// Check what this needs
getAnalytics(firebaseApp)

export const AuthContext = createContext(getAuth(firebaseApp))

function App() {
  const { user } = useFirebaseAuth()
  const db = useMemo(() => getFirestore(), [])
  const [things, setThings] = useState<Thing[]>([])
  const [tags, setTags] = useState<TagItem[]>([])

  // Find all tags from dataset and set them to state
  const findAllTags = useCallback((data: Thing[]) => {
    const tempTags: string[] = []
    data.forEach((x) => {
      tempTags.push(...x.tags)
    })
    const tagItems: TagItem[] = [...new Set(tempTags)].map((x) => {
      return { title: x, active: false }
    })

    setTags(tagItems)
  }, [])

  // Fetch user's stored data on startup
  useEffect(() => {
    if (!user) return
    getThingsByUser(db, user.uid).then((data) => {
      setThings(data)
      findAllTags(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, user])

  // Add a new thing to the displayed list of things after adding it to firebase
  const addThingUI = useCallback(
    (thing: Thing) => {
      setThings([...things, thing])
      findAllTags([...things, thing])
    },
    [findAllTags, things]
  )

  return (
    <>
      {user ? (
        <>
          <SignOut />
          <ThingMain tags={tags} things={things} setTags={setTags} setThings={setThings} />
          <AddThing addThingUI={addThingUI} />
        </>
      ) : (
        <SignIn />
      )}
    </>
  )
}

export default App

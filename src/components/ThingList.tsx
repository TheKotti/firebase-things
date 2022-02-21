import { useCallback, useMemo } from 'react'
import { getFirestore } from 'firebase/firestore'

import { useFirebaseAuth } from '../hooks'
import { deleteThing } from '../api'

type Props = {
  things: Thing[]
  setThings: (tags: Thing[]) => void
}

const ThingList = ({ things, setThings }: Props) => {
  const db = useMemo(() => getFirestore(), [])
  const { user } = useFirebaseAuth()

  // Handle pressing the delete button
  const handleDeleteClick = useCallback(
    (thingId?: string) => {
      if (!user || !thingId) return

      deleteThing(db, user.uid, thingId).then(() => {
        setThings(things.filter((x) => x.id !== thingId))
      })
    },
    [db, setThings, things, user]
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {things.map((x, i) => {
        return (
          <div key={x.id}>
            <a href={x.url} target='_blank' rel='noreferrer'>
              {x.title}
            </a>
            <button onClick={() => handleDeleteClick(x.id)}>X</button>
          </div>
        )
      })}
    </div>
  )
}

export default ThingList

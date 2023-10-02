import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from 'src/utils/firebase'

export default function useRooms() {
  const [snapshot] = useCollection(
    query(collection(db, 'rooms'), orderBy('timestamp', 'asc'))
  )

  const rooms = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return rooms
}

import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from 'src/utils/firebase'

export default function useChats(user) {
  const [snapshot] = useCollection(
    query(
      collection(db, `users/${user.uid}/chats`),
      orderBy('timestamp', 'asc')
    )
  )

  const rooms = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return rooms
}

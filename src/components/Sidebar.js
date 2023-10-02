import {
  Add,
  ExitToApp,
  SearchOutlined,
  Home,
  Message,
  PeopleAlt,
} from '@mui/icons-material'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'
import SidebarTab from './SidebarTab'
import SidebarList from './SidebarList'
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { auth, db } from 'src/utils/firebase'
import useRooms from 'src/hooks/useRooms'
import useUsers from 'src/hooks/useUsers'
import useChats from 'src/hooks/useChats'

const tabs = [
  {
    id: 1,
    icon: <Home />,
  },
  {
    id: 2,
    icon: <Message />,
  },
  {
    id: 3,
    icon: <PeopleAlt />,
  },
]

export default function Sidebar({ user }) {
  const [menu, setMenu] = useState(1)
  const [roomName, setRoomName] = useState('')
  const [isCreatingRoom, setCreatingRoom] = useState(false)
  const rooms = useRooms()
  const users = useUsers(user)
  const router = useRouter()
  const chats = useChats(user)
  const [searchResults, setSearchResults] = useState([])

  async function createRoom() {
    if (roomName?.trim()) {
      const roomsRef = collection(db, 'rooms')
      const newRoom = await addDoc(roomsRef, {
        name: roomName,
        timestamp: serverTimestamp(),
      })
      setCreatingRoom(false)
      setRoomName('')
      setMenu(2)
      router.push(`/?roomId=${newRoom.id}`)
    }
  }

  async function searchUsersandRooms(event) {
    event.preventDefault()
    const searchValue = event.target.elements.search.value
    const userQuery = query(
      collection(db, 'users'),
      where('name', '==', searchValue)
    )
    const roomQuery = query(
      collection(db, 'rooms'),
      where('name', '==', searchValue)
    )
    const userSnapshot = await getDocs(userQuery)
    const roomSnapshot = await getDocs(roomQuery)
    const userResults = userSnapshot?.docs.map((doc) => {
      const id =
        doc.id > user.uid ? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`
    })
    const roomResults = roomSnapshot?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    const searchResults = [...userResults, ...roomResults]
    setMenu(4)
    setSearchResults(searchResults)
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header--left">
          <Avatar src={user.photoURL} alt={user.displayName} />
          <h4>{user.displayName}</h4>
        </div>
        <div className="sidebar__header--right">
          <IconButton onClick={() => auth.signOut()}>
            <ExitToApp />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <form
          onSubmit={searchUsersandRooms}
          className="sidebar__search--container"
        >
          <SearchOutlined />
          <input
            type="text"
            id="search"
            placeholder="Search for users or rooms"
          />
        </form>
      </div>

      <div className="sidebar__menu">
        {tabs.map((tab) => (
          <SidebarTab
            key={tab.id}
            onClick={() => setMenu(tab.id)}
            isActive={tab.id === menu}
          >
            <div className="sidebar__menu--home">
              {tab.icon}
              <div className="sidebar__menu--line" />
            </div>
          </SidebarTab>
        ))}
      </div>

      {menu === 1 ? (
        <SidebarList title="Chats" data={chats} />
      ) : menu === 2 ? (
        <SidebarList title="Rooms" data={rooms} />
      ) : menu === 3 ? (
        <SidebarList title="Users" data={users} />
      ) : menu === 4 ? (
        <SidebarList title="Search Results" data={searchResults} />
      ) : null}

      <div className="sidebar__chat--addRoom">
        <IconButton onClick={() => setCreatingRoom(true)}>
          <Add />
        </IconButton>
      </div>

      <Dialog
        open={isCreatingRoom}
        maxWidth="sm"
        onClose={() => setCreatingRoom(false)}
      >
        <DialogTitle>Create New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>Type name of your public room.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="roomName"
            onChange={(event) => setRoomName(event.target.value)}
            value={roomName}
            label="Room Name"
            type="email"
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setCreatingRoom(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={createRoom}>
            Add Room
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import About from './components/About'
import Lawyers from './components/Lawyers'
import Browse from './components/Browse'
import Profile from './components/Profile'
import LawyerDescription from './components/LawyerDescription'
import Courts from './components/admin/Courts'
import CourtCreate from './components/admin/CourtCreate'
import CourtSetup from './components/admin/CourtSetup'
import AdminLawyers from "./components/admin/AdminLawyers";
import PostLawyer from './components/admin/PostLawyer'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ChatPage from './components/ChatPage'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import { io } from 'socket.io-client'
import { useEffect } from 'react'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <About />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/chat',
    element: <ChatPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/lawyers",
    element: <Lawyers />
  },
  {
    path: "/description/:id",
    element: <LawyerDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/courts",
    element: <ProtectedRoute><Courts/></ProtectedRoute>
  },
  {
    path:"/admin/courts/create",
    element: <ProtectedRoute><CourtCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/courts/:id",
    element:<ProtectedRoute><CourtSetup/></ProtectedRoute> 
  },
  {
    path:"/admin/lawyers",
    element:<ProtectedRoute><AdminLawyers/></ProtectedRoute> 
  },
  {
    path:"/admin/lawyers/create",
    element:<ProtectedRoute><PostLawyer/></ProtectedRoute> 
  },
  {
    path:"/admin/lawyers/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },

])
function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('http://localhost:8080', {
        query: {
          userId: user?._id
        },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        withCredentials: true
      });

      socketio.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socketio.on('connect', () => {
        console.log('Socket connected successfully');
        dispatch(setSocket(socketio));
      });

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.disconnect();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App

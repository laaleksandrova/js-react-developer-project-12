import { useContext } from 'react';
import { AuthContext, SocketContext } from '../context/index.jsx';

export const useAuth = () => useContext(AuthContext);

export const useSocket = () => useContext(SocketContext);

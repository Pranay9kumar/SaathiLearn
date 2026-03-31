import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getApiOrigin } from '../config/api';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token && user) {
      // Connect to Socket.io server
      const newSocket = io(getApiOrigin(), {
        auth: { token },
      });

      newSocket.on('connect', () => {
        console.log('🔗 Connected to Socket.io server');
        if (user.role === 'MENTOR') {
          // Join rooms for all mentor subjects
          user.subjects?.forEach(subject => {
             newSocket.emit('join:subject', subject);
          });
        }
      });

      newSocket.on('connect_error', (err) => {
        console.error('Socket connect error:', err.message);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else {
      // Disconnect when logged out
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [token, user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

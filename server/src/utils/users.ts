// Define User and Room structure
interface User {
  id: string;
  username: string;
}
type RoomUsers = Record<string, User[]>;
const users: RoomUsers = {};

// Join a user to a room
export function userJoin(id: string, username: string, roomId: string): User | null {
  const user = { id, username };
  if (!users[roomId]) {
    users[roomId] = [user];
    return user;
  }

  if (users[roomId].length < 2) {
    users[roomId].push(user);
    return user;
  }

  return null; // Room full
}

// Join a user to a room
export function userJoinClassChat(id: string, username: string, roomId: string): User | null {
  const user = { id, username };
  if (!users[roomId]) {
    users[roomId] = [user];
    return user;
  }

  if (users[roomId].length < 20) {
    users[roomId].push(user);
    return user;
  }

  return null; // Room full
}

// Get a user by their socket ID
export function getCurrentUser(id: string): User | undefined {
  for (const room in users) {
    const user = users[room].find((u) => u.id === id);
    if (user) return user;
  }
  return undefined;
}

// Remove user from any room
export function userLeave(id: string): User | undefined {
  for (const room in users) {
    const index = users[room].findIndex((u) => u.id === id);
    if (index !== -1) {
      const [removed] = users[room].splice(index, 1);
      if (users[room].length === 0) {
        delete users[room];
      }
      return removed;
    }
  }
  return undefined;
}

// Get users in a specific room
export function getRoomUsers(roomId: string): User[] {
  return users[roomId] || [];
}

export function isUserInConversation(username: string, conversationId: string): boolean {
  const roomUsers = users[conversationId];
  if (!roomUsers) {
    return false; // Conversation/room does not exist
  }
  const isOnline = roomUsers.some((user) => user.username === username);
  return isOnline;
}
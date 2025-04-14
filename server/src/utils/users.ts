interface User {
  id: string;
  username: string;
  room: string;
}

const users: User[] = [];

// Join user to chat
export function userJoin(id: string, username: string, room: string): User {
  const user = { id, username, room };
  users.push(user);
  return user;
}

// Get Current User
export function getCurrentUser(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

// User Leaves Chat
export function userLeave(id: string): User | undefined {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get Room Users
export function getRoomUsers(room: string): User[] {
  return users.filter((user) => user.room === room);
}

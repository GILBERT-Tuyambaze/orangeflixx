import { User } from '@/types';

const USERS_KEY = 'orangeflix_users';
const CURRENT_USER_KEY = 'orangeflix_current_user';

export class AuthService {
  static getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  static async register(email: string, password: string, name: string): Promise<boolean> {
    const users = this.getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isAdmin: email === 'admin@orangeflix.com', // Make admin@orangeflix.com the admin
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);
    
    return true;
  }

  static async login(email: string, password: string): Promise<boolean> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }

    // In a real app, you'd verify the password
    this.setCurrentUser(user);
    return true;
  }

  static logout(): void {
    this.setCurrentUser(null);
  }
}
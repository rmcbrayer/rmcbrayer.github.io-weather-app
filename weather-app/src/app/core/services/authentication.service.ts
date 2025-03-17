import { inject, Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { LocalStorageService } from './local-storage.service';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Authentication instance used for the Firebase Auth API endpoints
  private auth = getAuth();

  // Local storage service to store the user
  private localStorageService = inject(LocalStorageService);

  constructor() { }

  /**
   * @description Sign up new users
   * Reference: https://firebase.google.com/docs/auth/web/start#web_2
   * @param email User email
   * @param password User password
   */
  public async createUserWithEmailAndPassword(email: string, password: string): Promise<User | FirebaseError> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        this.localStorageService.setItem('user', JSON.stringify(user));
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * @description Sign in existing users
   * Reference: https://firebase.google.com/docs/auth/web/start#web_2
   * @param email User email
   * @param password User password
   */
  public async signInWithEmailAndPassword(email: string, password: string): Promise<User | FirebaseError> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.localStorageService.setItem('user', JSON.stringify(user));
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * @description Sign out users
   * Reference: https://firebase.google.com/docs/auth/web/password-auth
   */
  public async signOut() : Promise<boolean | FirebaseError> {
    return signOut(this.auth)
      .then(() => {
        // Sign out successful
        this.localStorageService.removeItem('user');
        return true;
      })
      .catch((error) => {
        throw error;
      });
  }
}

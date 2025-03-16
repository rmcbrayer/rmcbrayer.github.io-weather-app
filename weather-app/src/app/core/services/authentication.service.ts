import { inject, Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { MessageService } from 'primeng/api';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Authentication instance used for the Firebase Auth API endpoints
  private auth = getAuth();

  // Message service for Toast notifications
  private messageService = inject(MessageService);

  // Local storage service to store the user
  private localStorageService = inject(LocalStorageService);

  constructor() { }

  /**
   * @description Sign up new users
   * Reference: https://firebase.google.com/docs/auth/web/start#web_2
   * @param email User email
   * @param password User password
   */
  public createUserWithEmailAndPassword(email: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        this.localStorageService.setItem('user', JSON.stringify(user));
        // TODO: Route to dashboard
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.logError(errorCode, errorMessage);
      });
  }

  /**
   * @description Sign in existing users
   * Reference: https://firebase.google.com/docs/auth/web/start#web_2
   * @param email User email
   * @param password User password
   */
  public signInWithEmailAndPassword(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.localStorageService.setItem('user', JSON.stringify(user));
        // TODO: Route to dashboard
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.logError(errorCode, errorMessage);
      });
  }

  /**
   * @description Sign out user
   * Reference: https://firebase.google.com/docs/auth/web/password-auth
   */
  public signOut() : void {
    signOut(this.auth)
      .then(() => {
        // Sign out successful
        this.localStorageService.removeItem('user');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.logError(errorCode, errorMessage);
      });
  }

  /**
   * @description Console log the error for easier debugging and notify the user
   * @param code Error code
   * @param message Error message
   */
  private logError(code: string, message: string): void {
    console.log(`Error ${code}: ${message}`)
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}

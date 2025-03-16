import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * @description Sets the key,value pair in local storage
   * @param key Reference key
   * @param value Value for reference key
   */
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * @description Gets the value for the reference key from local storage
   * @param key Reference key
   * @returns Value for reference key
   */
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * @description Removes the value for the reference key from local storage
   * @param key Reference key
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * @description Clears all items from local storage
   */
  clear(): void {
    localStorage.clear();
  }
}

/** User model matches the same UserInfo model from the Firebase API */
export interface User {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}
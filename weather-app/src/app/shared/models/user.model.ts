import { Units } from "./units.model";

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    location: string;
    language: string;
    units: Units;
}
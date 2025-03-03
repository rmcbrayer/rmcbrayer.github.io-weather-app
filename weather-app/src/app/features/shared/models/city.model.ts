import { Coordinate } from "./coordinate.model";

export interface City {
  id: number;
  name: string;
  coord: Coordinate;
  country: string; //country code
  population: number;
  timezone: number;
  sunrise: Date; //UTC
  sunset: Date; //UTC
}
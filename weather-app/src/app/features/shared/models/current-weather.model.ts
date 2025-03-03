// Weather Request Parameters & Response DTO that matches the Current Weather API
// https://openweathermap.org/current

import { BaseRequestParams, BaseMain } from "./base.model";
import { Clouds } from "./cloud.model";
import { Coordinate } from "./coordinate.model";
import { Weather } from "./weather.model";
import { Wind } from "./wind.model";

export interface WeatherRequestParams extends BaseRequestParams {};

export interface WeatherResponseDto {
    coord: Coordinate;
    weather: Weather;
    base: string;
    main: BaseMain;
    visibility: number; //meters
    wind: Wind;
    rain: Rain;
    clouds: Clouds;
    dt: Date; //UTC
    sys: Sys;
    timezone: Date; //UTC
    id: number;
    name: string;
    cod: number;
}

interface Rain {
    "1h": number; //mm/h
}

interface Sys {
    type: number;
    id: number;
    country: string; //country code
    sunrise: Date; //UTC
    sunset: Date; //UTC
}
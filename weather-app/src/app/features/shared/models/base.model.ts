// Base models for the Open Weather Map API that have been extended in at least one other model
// https://openweathermap.org/api

export interface BaseRequestParams {
  lat: string;
  lon: string;
  appid: string;
  mode?: string; //default JSON. other options: xml, html
  units?: string; //default Standard. other options: metric, imperial
  lang?: string;
}

export interface BaseMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number; //hPa
  humidity: number; //%
  sea_level: number; //hPa
  grnd_level: number; //hPa
}
// Weather Maps Request Parameters & Response DTO that matches the Weather Maps API
// https://openweathermap.org/api/weathermaps

export interface WeatherMapsRequestParams {
  layer: string;
  z: number; //zoom level
  x: number; //x tile coordinate
  y: number; //y tile coordinate
  appid: string;
}
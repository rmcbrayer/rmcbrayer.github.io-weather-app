// Forecast Request Parameters & Response DTO that matches the 5 Day Weather Forecast API
// https://openweathermap.org/forecast5

import { BaseRequestParams, BaseMain } from "./base.model";
import { City } from "./city.model";
import { Clouds } from "./cloud.model";
import { Weather } from "./weather.model";
import { Wind } from "./wind.model";

export interface ForecastRequestParams extends BaseRequestParams {
  cnt?: number;
}

export interface ForecastResponseDto {
  cod: number;
  message: number;
  cnt: number;
  list: Array<ForecastItem>;
  city: City;
}

interface ForecastItem {
  dt: Date; //UTC
  main: Main;
  weather: Weather;
  clouds: Clouds;
  wind: Wind;
  visibility: number; //meters
  pop: number; //%
  rain: Rain;
  sys: Sys;
  dt_txt: Date;
}

interface Main extends BaseMain {
  temp_kf: number;
}

interface Rain {
  "3h": number; //mm/3hr
}

interface Sys {
  pod: number;
}
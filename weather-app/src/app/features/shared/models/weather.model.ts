export interface Weather {
    id: number;
    main: WeatherParameter;
    description: string;
    icon: WeatherIcon;
  }
  
  export enum WeatherParameter {
    Thunderstorm = "Thunderstorm",
    Drizzle = "Drizzle",
    Rain = "Rain",
    Snow = "Snow",
    Atmosphere = "Atmosphere",
    Clear = "Clear",
    Clouds = "Clouds"
  }
  
  export type WeatherIcon = "01d" | "01n" | "02d" | "02n" | "03d" | "03n" | "04d" | "04n" | "09d" | "10d" | "11d" | "13d" | "50d";
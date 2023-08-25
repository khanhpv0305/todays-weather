type BaseWeatherDataItem = {
  dt: number
  uvi: number
  humidity: number
  visibility: number
  feels_like: number
  weather: {
    icon: string
    main: string
    description: string
  }[]
}

export type WeatherDataItem = BaseWeatherDataItem & {
  temp: number
}

export type WeatherDataItemDaily = BaseWeatherDataItem & {
  temp: {
    min: number
    max: number
  }
}

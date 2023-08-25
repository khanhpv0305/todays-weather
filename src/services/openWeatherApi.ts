import { WeatherDataItem, WeatherDataItemDaily } from "../types/weatherData"
import { SEARCHING_NOT_FOUND } from "../constants/errors"

const APP_ID = '4374c8c1b45d7ae36d51831757a284d4'
const BASE_URL = 'http://api.openweathermap.org'

type GeoLocationItem = {
  name: string
  lat: number
  lon: number
}

type GeoCoding = (city: string, country: string) => Promise<GeoLocationItem>

export const getGeoLocation: GeoCoding = async (city, country) => {
  try {
    const url = `${BASE_URL}/geo/1.0/direct?q=${city},${country}&limit=1&appid=${APP_ID}`
    const foundItems = await fetch(url).then<GeoLocationItem[]>(data => data.json())

    if (!foundItems[0]) {
      throw new Error(SEARCHING_NOT_FOUND)
    }

    return foundItems[0]
  } catch {
    throw new Error(SEARCHING_NOT_FOUND)
  }
}

type GetWeatherData = (lat: number, lon: number) => Promise<{
  current: WeatherDataItem
  hourly: WeatherDataItem[]
  daily: WeatherDataItemDaily[]
}>

export const getWeatherData: GetWeatherData = (lat: number, lon: number) => {
  const url = `${BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`

  return fetch(url).then(data => data.json())
}

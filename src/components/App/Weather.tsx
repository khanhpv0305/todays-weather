import { FormEventHandler, MouseEventHandler, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {BsSearch, BsSun, BsEye} from 'react-icons/bs'
import {WiHumidity} from 'react-icons/wi'
import {FaTemperatureHigh} from 'react-icons/fa'

import CurrentWeather from './CurrentWeather'
import HourlyForecast from './HourlyForecast'
import DailyForecast from './DailyForecast'
import History from './History'
import Widget from './Widget'
import Input from './Input'
import { getGeoLocation, getWeatherData } from '../../services/openWeatherApi'
import WEATHER_BACKGROUND from '../../constants/weatherBackground'

const HISTORY_LS_KEY = 'SEARCHING_HISTORY'

const Weather: React.FC = () => {
  const [cityInput, setCityInput] = useState('')
  const [countryInput, setCountryInput] = useState('')
  const [history, setHistory] = useState<{
    id: number,
    name: string,
    city: string,
    country: string,
  }[]>([])

  const { data, error, refetch } = useQuery({
    queryKey: ['SEARCHING_RESULT', cityInput, countryInput],
    queryFn: async () => {
      const geoLocation = await getGeoLocation(cityInput, countryInput)
      const weatherData = await getWeatherData(geoLocation.lat, geoLocation.lon)

      return {
        name: geoLocation.name,
        ...weatherData,
      }
    },
    enabled: false,
  })

  useEffect(() => {
    try {
      const lsHistory = localStorage.getItem(HISTORY_LS_KEY)

      if (!lsHistory) {
        setHistory([])
      } else {
        setHistory(JSON.parse(lsHistory as string))
      }
    } catch {
      setHistory([])
    }
  }, [])

  useEffect(() => {
    if (!data) return

    setHistory(prevHistory => {
      const nextHistory = [
        {
          id: Date.now(),
          name: data.name,
          city: cityInput,
          country: countryInput,
        },
        ...prevHistory,
      ].slice(0, 10)

      localStorage.setItem(
        HISTORY_LS_KEY,
        JSON.stringify(nextHistory),
      )

      return nextHistory
    })
  }, [cityInput, countryInput, data])

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    
    const city = cityInput.trim()
    const country = countryInput.trim()

    if (city && country) {
      refetch()
    }
  }

  const handleRefetchHistory = (city: string, country: string): MouseEventHandler<HTMLDivElement> => () => {
    setCityInput(city)
    setCountryInput(country)
    setTimeout(refetch, 0)
  }

  const handleDeleteHistory = (id: number): MouseEventHandler<HTMLButtonElement> => (e) => {
    e.stopPropagation()
    
    setHistory(() => {
    const nextHistory = history.filter(item => item.id !== id)

      localStorage.setItem(
        HISTORY_LS_KEY,
        JSON.stringify(nextHistory),
      )

      return nextHistory
    })
  }

  const weatherMoodMain = useMemo(() => {
    if (!data) return ''

    return data.current.weather[0].main.toLowerCase()
  }, [data])

  const weatherBg = useMemo(() => {
    return weatherMoodMain
      ? WEATHER_BACKGROUND[weatherMoodMain as keyof typeof WEATHER_BACKGROUND]
      : WEATHER_BACKGROUND.clear
  }, [weatherMoodMain])

  const dailyData = useMemo(() => {
    if (!data) return []

    return data.daily
      .slice(0, 7)
      .map(item => {
        return {
          ...item,
          temp: {
            ...item.temp,
            min: Math.round(item.temp.min),
            max: Math.round(item.temp.max),
          },
        }
      })
  }, [data])

  const dailyTempMin = useMemo(() => {
    return Math.min(...dailyData.map(item => item.temp.min))
  }, [dailyData])

  const dailyTempMax = useMemo(() => {
    return Math.max(...dailyData.map(item => item.temp.max))
  }, [dailyData])

  return (
    <div
      className='text-white py-7 bg-fixed min-h-screen'
      style={{ backgroundImage: `url('${weatherBg}')` }}
    >
      <div className='container mx-auto max-w-screen-lg px-3.5 md:px-0'>
        <form
          className='rounded-full bg-black/[.4] h-14 inline-flex items-center px-2 mb-4 w-full'
          onSubmit={handleFormSubmit}
        >
          <Input
            name='country'
            placeholder='e.g. VN'
            value={countryInput}
            handleChange={(e) => setCountryInput(e.target.value)}
          />

          <Input
            name='city'
            placeholder='e.g. Ho Chi Minh'
            value={cityInput}
            handleChange={(e) => setCityInput(e.target.value)}
          />

          <button
            type='submit'
            className='bg-white/[.1] h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/[.2]'
          >
            <BsSearch />
          </button>
        </form>

        {error
          ? <div className='rounded-widget backdrop-blur-md px-4 py-4 bg-red-300'>Not found</div>
          : data && (
            <>
              <div className='md:grid md:grid-cols-2 md:gap-4 mb-4'>
                <CurrentWeather
                  name={data.name}
                  currentTemp={data.current.temp}
                  dailyTempMin={dailyTempMin}
                  dailyTempMax={dailyTempMax}
                  icon={data.current.weather[0].icon}
                  description={data.current.weather[0].description}
                />

                <HourlyForecast hourlyData={data.hourly} />
              </div>

              <div className='md:flex md:gap-4'>
                <DailyForecast
                  dailyData={dailyData}
                  dailyTempMin={dailyTempMin}
                  dailyTempMax={dailyTempMax}
                />

                <div className='basis-3/6'>
                  <div className='grid grid-cols-2 gap-4'>
                    <Widget icon={<BsSun />} className='text-5xl aspect-square' title='UV INDEX'>
                      <div className='text-center'>{data?.current.uvi}</div>
                    </Widget>

                    <Widget icon={<WiHumidity />} className='text-5xl aspect-square' title='HUMIDITY'>
                      <div className='text-center'>{data?.current.humidity} %</div>
                    </Widget>
                    
                    <Widget icon={<BsEye />} className='text-5xl aspect-square' title='VISIBILITY'>
                      <div className='text-center'>{data?.current.visibility / 1000} km</div>
                    </Widget>

                    <Widget icon={<FaTemperatureHigh />} className='text-5xl aspect-square' title='FEELS LIKE'>
                      <div className='text-center'>{Math.round(data?.current.feels_like)}°C</div>
                    </Widget>
                  </div>
                </div>
              </div>
            </>
          )}

          <History
            marginTop={!!(data || error)}
            history={history}
            handleDeleteHistory={handleDeleteHistory}
            handleRefetchHistory={handleRefetchHistory}
          />
      </div>
    </div>
  )
}

export default Weather

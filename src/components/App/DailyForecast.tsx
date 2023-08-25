import { BsCalendarDate } from 'react-icons/bs'

import Widget from './Widget'
import getIconUrl from '../../utils/getIconUrl'

const getDayOfWeek = (dayIndex: number) => {
  switch (dayIndex) {
    case 0: {
      return 'Sun'
    }

    case 1: {
      return 'Mon'
    }

    case 2: {
      return 'Tue'
    }

    case 3: {
      return 'Wed'
    }

    case 4: {
      return 'Thu'
    }

    case 5: {
      return 'Fri'
    }

    default: {
      return 'Sat'
    }
  }
}

type DailyForecastProps = {
  dailyData: {
    temp: {
        min: number
        max: number
    }
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
  }[]
  dailyTempMin: number
  dailyTempMax: number
}

const DailyForecast: React.FC<DailyForecastProps> = ({
  dailyData,
  dailyTempMin,
  dailyTempMax,
}) => {
  return (
    <Widget
      className='mb-4 md:mb-0 md:aspect-square'
      icon={<BsCalendarDate />}
      title='DAILY FORECAST'
    >
      {dailyData.map((item, index) => {
        const dayIndex = new Date(item.dt * 1000).getDay()

        return (
          <div key={item.dt} className='flex items-center py-2'>
            <div className='flex-auto basis-12'>
              {index === 0 ? 'Today' : getDayOfWeek(dayIndex)}
            </div>

            <div className='flex-auto'>
              <img
                className='h-9'
                src={getIconUrl(item.weather[0].icon, 2)}
                alt={item.weather[0].description}
              />
            </div>

            <div className='basis-12 flex-none'>{item.temp.min}°C</div>

            <div className='relative flex-1 basis-32 bg-black/[.5] h-1 rounded-full'>
              <div
                className='absolute h-1 rounded-full bg-orange-500 top-0 bottom-0'
                style={{
                  left: `${Math.abs(item.temp.min - dailyTempMin) / (dailyTempMax - dailyTempMin) * 100}%`,
                  right: `${Math.abs(item.temp.max - dailyTempMax) / (dailyTempMax - dailyTempMin) * 100}%`,
                }}
              />
            </div>
            <div className='basis-12 flex-none text-right'>{item.temp.max}°C</div>
          </div>
        )
      })}
    </Widget>
  )
}

export default DailyForecast

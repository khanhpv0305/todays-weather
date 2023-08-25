import { BsClock } from "react-icons/bs"

import { WeatherDataItem } from "../../types/weatherData"
import Widget from "./Widget"
import getIconUrl from "../../utils/getIconUrl"

type HourlyForecastProps = {
  hourlyData: WeatherDataItem[]
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  return (
    <Widget
      icon={<BsClock />}
      title='HOURLY FORECAST'
    >
      <div className='flex gap-2 mt-4 md:mt-0 mb-4 md:mb-0'>
        {hourlyData.slice(0, 10).map((item, index) => {
          return (
            <div key={item.dt}>
              <div className='text-center'>
                {index === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
                <img
                  src={getIconUrl(item.weather[0].icon)}
                  alt={item.weather[0].description}
                />
                <div>{Math.round(item.temp)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </Widget>
  )
}

export default HourlyForecast

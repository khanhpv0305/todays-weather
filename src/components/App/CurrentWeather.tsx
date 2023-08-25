import Widget from './Widget'
import getIconUrl from '../../utils/getIconUrl'

type CurrentWeatherProps = {
  name: string
  currentTemp: number
  dailyTempMax: number
  dailyTempMin: number
  icon: string
  description: string
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  name,
  currentTemp,
  dailyTempMax,
  dailyTempMin,
  icon,
  description,
}) => {
  return (
    <Widget
      className='mb-4 md:mb-0'
      title='CURRENT'
    >
      <div className='text-center flex items-end justify-around pb-12'>
        <div className='flex flex-col justify-between'>
          <div className='text-xl mb-3'>{name}</div>
          <div className='text-5xl pt-6 pb-5'>{Math.round(currentTemp)}°C</div>
          <div className='mt-2 text-lg'>High: {dailyTempMax}°C, Low: {dailyTempMin}°C</div>
        </div>
      
        <div>
          <img
            className='inline'
            src={getIconUrl(icon)}
            alt={description}
          />
          <div className='text-lg capitalize'>{description}</div>
        </div>
      </div>
    </Widget>
  )
}

export default CurrentWeather

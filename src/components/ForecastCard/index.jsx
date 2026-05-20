import styles from './forecast.card.module.css'
import { formatWeekday } from '../../utils/formatWeekday'

const ForecastCard = ({ weather, weekday }) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p>{formatWeekday(weekday)}</p>
        <p>{weather?.date}</p>
      </div>
      <img className={styles.weatherIcon} src={weather?.condition_slug ? `./icons-weather/${weather?.condition_slug}.svg` : `./icons-weather/fallback.svg}`}/>
      <p className={styles.temp}>{weather?.min}/{weather?.max}°</p>
    </div>
  )
}

export default ForecastCard
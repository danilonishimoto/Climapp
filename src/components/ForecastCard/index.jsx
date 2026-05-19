import styles from './forecast.card.module.css'
import { formatWeekday } from '../../utils/formatWeekday'

const ForecastCard = ({ weather, weekday }) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p>{formatWeekday(weekday)}</p>
        <p>{weather?.date}</p>
      </div>
      <img className={styles.weatherIcon} src={`./icons-weather/${weather?.condition}.svg`}/>
      <p className={styles.temp}>{weather?.min}/{weather?.max}°</p>
    </div>
  )
}

export default ForecastCard
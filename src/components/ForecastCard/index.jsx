import styles from './forecast.card.module.css'

const ForecastCard = ({ weather, date }) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <p>{date}</p>
        <p>{weather?.date}</p>
      </div>
      <img className={styles.weatherIcon} src={`./icons-weather/${weather?.condition}.svg`}/>
      <p className={styles.temp}>{weather?.min}/{weather?.max}°</p>
    </div>
  )
}

export default ForecastCard
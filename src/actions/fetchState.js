import axios from "axios";

// Util receive name of a city and return it with state abbreviation as following: São Luís, MA

export async function fetchState(city) {
  try {
    const res = await axios
    .get(`https://brasilapi.com.br/api/cptec/v1/cidade/${encodeURIComponent(city)}`)
    if(res.data && res.data.length > 0) {
      return res.data[0].estado
    }

    return null
  } catch (error) {
    console.log('Invalid city name', error)
    return null
  }
}

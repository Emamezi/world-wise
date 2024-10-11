import { useCities } from "../../Context/CitiesContext";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";

function CountryList() {
  const { cities } = useCities();
  // const countries = [...new Set(cities.map((city) => city.country))];

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  console.log(countries);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;

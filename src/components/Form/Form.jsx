// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useCities } from "../../Context/CitiesContext";
import { Navigate, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import BackButton from "../BackButton/BackButton";
import useUrlPosition from "../../Hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_GEO_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";
function Form() {
  const navigate = useNavigate();
  const { addNewCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isGeoReverseCoding, setIsGeoReverseCoding] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };
    await addNewCity(newCity);
    navigate("/app/cities");
  }
  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchCityData() {
      try {
        setGeoCodingError("");
        setIsGeoReverseCoding(true);
        const res = await fetch(
          `${BASE_GEO_URL}latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That does not seem to be a city. Please click somewhere else"
          );
        setCityName(data.city || data.locality);
        setEmoji(convertToEmoji(data.countryCode));
        console.log(data);
      } catch (error) {
        setGeoCodingError(error.message);
        setIsGeoReverseCoding(false);
      } finally {
        setIsGeoReverseCoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (isGeoReverseCoding) return <Spinner />;
  if (!lat && !lng)
    return <Message messsage="start by clicking somewhere on the map" />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

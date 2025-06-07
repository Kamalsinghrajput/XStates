import { useEffect, useState } from "react";

const States = () => {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        const data = await response.json();
        setCity(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCities();
  }, [selectedState]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Select Location</h2>
      <div style={{ textAlign: "center", marginRight:"10px" }}>
        <select
          name=""
          id=""
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {country.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <select
          name=""
          id=""
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select States</option>
          {state.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <select name="" id="">
          <option value=""> Select City</option>
          {city.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default States;

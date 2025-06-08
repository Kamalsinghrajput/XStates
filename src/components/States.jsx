import { useEffect, useState } from "react";

const States = () => {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

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
        setSelectedState("");
        setCity([]);
        setSelectedCity("");
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        const data = await response.json();
        setCity(data);
        setSelectedCity("");
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [selectedState]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Select Location</h2>
      <select
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
      >
        <option value="">Select Country</option>
        {country.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSelectedState(e.target.value)}
        value={selectedState}
        disabled={!selectedCountry}
        style={{ marginLeft: "10px" }}
      >
        <option value="">Select State</option>
        {state.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSelectedCity(e.target.value)}
        value={selectedCity}
        disabled={!selectedState}
        style={{ marginLeft: "10px" }}
      >
        <option value="">Select City</option>
        {city.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      {selectedCountry && selectedState && selectedCity && (
        <div style={{ marginTop: "20px" }}>
          <strong>
            You Selected {selectedCity}, {selectedState}, {selectedCountry}
          </strong>
        </div>
      )}
    </div>
  );
};

export default States;

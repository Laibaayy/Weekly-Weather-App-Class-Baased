import React, { Component } from "react";
import Weather from "./Components/Weather";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Location: "",
      displayLocation: "",
      weather: {},
      isloading: false,
    };
    this.locationhandler = this.locationhandler.bind(this);
    this.fetchhandler = this.fetchhandler.bind(this);
    this.formatDay = this.formatDay.bind(this);
  }
  locationhandler(e) {
    this.setState({ Location: e.target.value });
  }

  async getweather(loc) {
    this.setState({ isloading: true });
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${loc}`
      );
      if (!response.ok) {
        throw new Error("Something weny wrong");
      }
      const data = await response.json();
      if (!data.results) {
        throw new Error("Location not found");
      }
      const { name, country_code, timezone, latitude, longitude } =
        data.results.at(0);
      this.setState({ displayLocation: `${name} ${country_code}` });

      const weatherdataapi = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const mynewdata = await weatherdataapi.json();
      this.setState({ weather: mynewdata.daily });
    } catch (error) {
      console.error("There was an error fetching the weather data:", error);
    } finally {
      this.setState({ isloading: false });
    }
  }

  async fetchhandler() {
    console.log(this.state.Location);
    const data = await this.getweather(this.state.Location);
    if (data) {
      this.setState({ weather: data, displayLocation: this.state.Location });
      console.log("Weather data:", data);
    }
  }
  formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", { weekday: "long" }).format(
      new Date(dateStr)
    );
  }

  render() {
    return (
      <div>
        <div>
          <h1>Classy Weather </h1>
          <div className="btn">
            <div>
              <input
                className="fontsize"
                type="text"
                placeholder="Enter location..."
                value={this.state.Location}
                onChange={this.locationhandler}
              />
            </div>
            <button onClick={this.fetchhandler} className="fontsize">
              Get Weather
            </button>
          </div>
          <p className="loc fontsize">
            <strong>Location: </strong>
            {this.state.displayLocation}
          </p>
        </div>
        {this.state.isloading && <p>Loading....</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.Location}
            formatDay={this.formatDay}
          />
        )}
      </div>
    );
  }
}

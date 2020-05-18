"use strict";

const config = {
  APPID: "eaca5914dc78d2a682690dbdb468b3a9",
};

const status = {
  isLoading: false,
};

const urls = {
  forecast: "https://api.openweathermap.org/data/2.5/weather",
};

class Weather {
  constructor() {}

  async getForecast(city) {
    if (status.isLoading) {
      return result(-9, "Venue is loading");
    }

    try {
      status.isLoading = true;
      const response = await fetch(
        `${urls.forecast}?q=${city}&APPID=${config.APPID}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        status.isLoading = false;
        return result(1, jsonResponse);
      }
      throw new Error("Weather request failed.");
    } catch (error) {
      status.isLoading = false;
      return result(-9, error.message);
    }
  }
}

const result = (status, data) => {
  return { status: status, data: data };
};

export default Weather;

"use strict";

import Geo from "./geo.js";
import Venue from "./venue.js";
import Weather from "./weather.js";

window.onload = function () {
  const controller = new Controller();

  const initGeo = controller.initGeo();

  initGeo.then((result) => {
    if (result.status === 1) {
      controller.city = controller.transToCity();
    }

    controller.getAvenueAndWeather(
      null,
      function (status) {
        switch (status) {
          case 1:
            controller.renderAvenue();
            break;
          default:
            break;
        }
      },
      function (status) {
        switch (status) {
          case 1:
            controller.renderForecast();
            break;
          default:
            break;
        }
      }
    );
  });

  document.getElementById("search").onclick = function (e) {
    e.preventDefault();

    controller.getAvenueAndWeather(
      document.getElementById("city").value,
      function (status) {
        switch (status) {
          case 1:
            controller.renderAvenue();
            break;
          default:
            break;
        }
      },
      function (status) {
        switch (status) {
          case 1:
            controller.renderForecast();
            break;
          default:
            break;
        }
      }
    );
  };
};

class Controller {
  constructor() {
    this._geo = new Geo();
    this._venue = new Venue();
    this._weather = new Weather();
    this._city = "taipei";
    this._renderData = {
      venues: null,
      forecast: null,
    };
  }

  get city() {
    return this._city;
  }
  set city(city) {
    this._city = city;
  }

  initGeo() {
    return this._geo.init();
  }

  transToCity() {
    //
    return this._city;
  }

  async getAvenueAndWeather(
    city = null,
    callBackSpot = null,
    callBackForecast = null
  ) {
    try {
      city = city || this._city;

      const promise_venue = await this._venue.getVenues(city);

      const ins = this;
      let _city = city;

      switch (promise_venue.status) {
        case 1:
          _city = promise_venue.data.response.geocode.displayString.split(
            ","
          )[0];
          ins._renderData.venues = promise_venue.data;
          break;
        default:
          break;
      }
      callBackSpot(promise_venue.status);

      const promise_foreCast = await ins._weather.getForecast(_city);
      switch (promise_foreCast.status) {
        case 1:
          ins._renderData.forecast = promise_foreCast.data;
          break;
        default:
          break;
      }
      callBackForecast(promise_foreCast.status);
    } catch (error) {
      console.log(error);
    }
  }

  renderAvenue() {
    const container = document.getElementById("vanues");
    container.innerHTML = "";
    this._renderData.venues.response.groups[0].items.forEach((i) => {
      const p = document.createElement("p");
      p.innerText = i.venue.name;
      container.appendChild(p);
    });
    console.log(this._renderData.venues);
  }

  renderForecast() {
    const container = document.getElementById("forecast");
    container.innerHTML = "";
    container.innerText = JSON.stringify(this._renderData.forecast.weather[0]);

    console.log(this._renderData.forecast);
  }
}

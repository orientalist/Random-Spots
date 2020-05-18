"use strict";

class Geo {
  constructor() {
    this._lat = null;
    this._long = null;
    this._isSupported = false;
  }
  set isSupported(isSupported) {
    this._isSupported = isSupported;
  }
  get isSupported() {
    return this._isSupported;
  }

  setLocation(lat, long) {
    this._lat = lat;
    this._long = long;
  }

  getLocation() {
    return {
      lat: this._lat,
      long: this._long,
    };
  }

  init() {
    return new Promise((res, rej) => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this._lat = position.coords.latitude;
              this._long = position.coords.longitude;
              this._isSupported = true;
              res(result(1, this.getLocation()));
            },
            (error) => {
              res(result(-9, error.message));
            }
          );
        } else {
          res(result(-9, "Denied"));
        }
      } catch (error) {
        res(result(-9, error.message));
      }
    });
  }
}

const result = (status, data) => {
  return { status: status, data: data };
};

export default Geo;

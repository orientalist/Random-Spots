"use strict";

const config = {
  client_id: "NALLAUGWSAN2WVNSEBAJB15BEDBQQAMP4FMI40I0BDH304PG",
  client_secret: "CMOVZN0NUKPO22R2CXEVJKPAX0DIIS2NTTBBK0TP1CLQJLUG",
};

const status = {
  isLoading: false,
};

const urls = {
  venue: "https://api.foursquare.com/v2/venues/explore",
};

class Venue {
  constructor() {}

  async getVenues(city) {
    if (status.isLoading) {
      return result(-9, "Venue is loading");
    }
    try {
      const now = new Date();
      status.isLoading = true;

      const response = await fetch(
        `${urls.venue}?near=${city}&client_id=${
          config.client_id
        }&client_secret=${config.client_secret}&v=${now.getFullYear()}${
          now.getMonth() < 9 ? `0${now.getMonth()}` : now.getMonth()
        }${now.getDate()}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        status.isLoading = false;
        return result(1, jsonResponse);
      }
      throw new Error("Venue request failed.");
    } catch (error) {
      status.isLoading = false;
      return result(-9, error.message);
    }
  }
}

const result = (status, data) => {
  return { status: status, data: data };
};

export default Venue;

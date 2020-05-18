"use strict";
import * as gmap from '';

const config = {};

const status = {};

const urls = {};

class GMap {
  constructor(mapElement=null,location=null){
    this._element=mapElement
    this._location=location;
    this._instance=null;

    if(this._element&&location){
      this._instance=new google.maps.Map(this._element,{
        center:{lat:this._location.lat,long:this._location.long},
        zoom:8
      });

    }
  }
}

const result = (status, data) => {
  return { status: status, data: data };
};

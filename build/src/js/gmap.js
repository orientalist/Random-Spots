(function () {
    "use strict";
  
    const config = {
      
    };
  
    const status = {

    };
  
    const urls = {
    };
  
    class GMap {
   
    }
  
    const result = (status, data) => {
      return { status: status, data: data };
    };
  
    let _global;
    _global = (function () {
      return this || (0, eval)("this");
    })();
  
    if (typeof define === "function" && define.amd) {
      define(function () {
        return GMap;
      });
    } else {
      !("GMap" in _global) && (_global.GMap = GMap);
    }
  })();
  
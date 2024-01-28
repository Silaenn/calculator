import React from "react";

const MapsApi = () => {
  const script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
  script.defer = true;
  document.head.appendChild(script);
};

export default MapsApi;

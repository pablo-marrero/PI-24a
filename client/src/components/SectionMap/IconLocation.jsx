import icon from "./img-section/icon-location.svg"
import L from "leaflet"

export const IconLocation = L.icon({
  iconUrl : icon,
  iconRetinaUrl: icon,
  iconAnchor:null,
  shadowAnchor:null,
  shadowSize:null,
  shadowUrl:null,
  iconSize:[35,35],
  className:"leaflet-venue-icon"
})
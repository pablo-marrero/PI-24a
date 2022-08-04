import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { IconLocation } from './IconLocation'
// import "./SectionMap.css"
import "../DetailCountry/DetailsCountry.css"

export const SectionMap = ({ lat, lng }) => {
//className='container-map'
// className={`container-map ${styleClass}`}
  return (
    <section className={`container-map`}>
      <MapContainer center={{lat:lat, lng:lng}} zoom={4}>
       <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <Marker position={{lat:lat, lng:lng}} icon={IconLocation}/>
       </MapContainer>
    </section>
  )
}
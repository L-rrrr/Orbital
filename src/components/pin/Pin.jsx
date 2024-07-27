import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './pin.scss';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Pin({ items }) {
  const position = [items[0].latitude, items[0].longitude];

  return (
    <Marker position={position}>
      <Popup>
        <div className="popupContainer">
          {items.map(item => (
            <div key={item._id} className="popupItem">
              <div className="textContainer">
                <Link to={`/hostel/${item._id}`}>{item.name}</Link>
                <span>{item.type} type</span>
                <p>${item.price} / month</p>
                <b>Rating: {Number(item.averageRating).toFixed(1)} ({item.ratings.length})</b>
              </div>
            </div>
          ))}
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;


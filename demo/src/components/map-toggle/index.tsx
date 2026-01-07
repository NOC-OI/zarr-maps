import { useState } from 'react';
import styles from './MapToogle.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export function MapToggle() {
  const navigate = useNavigate();
  const location = useLocation();

  const mapIsOLInitial = location.pathname === '/ol';
  const [mapIsOL, setMapIsOL] = useState(mapIsOLInitial);

  function handleChangeMapLibrary() {
    setMapIsOL(!mapIsOL);
    if (mapIsOLInitial) {
      navigate('/leaflet');
    } else {
      navigate('/ol');
    }
  }

  return (
    <div
      id="dimensions_toogle"
      className="text-[1rem] z-9998! font-extrabold leading-6 uppercase pl-0 sm:pl-3 pt-3 cursor-pointer"
    >
      <label className={`${styles.switch} relative cursor-pointer`}>
        <input type="checkbox" checked={mapIsOL} onChange={handleChangeMapLibrary} />
        <span className={`${styles.slider} ${styles.slider_animation}`}></span>
        <div
          className="absolute flex gap-2.5 -mt-6 text-[14px] pl-1.5 text-gray-200 font-changa"
          title="Toggle Map Library (Leaflet / OpenLayers)"
        >
          <div className="flex items-center justify-center">
            <img src="/leaflet-logo.png" alt="Leaflet Icon" className="ml-0 h-7 w-7 mt-2" />
          </div>
          <div className="flex items-center justify-center">
            <img src="/ol-logo.png" alt="OpenLayers Icon" className="h-7 w-7 mt-2" />
          </div>
        </div>
      </label>
    </div>
  );
}

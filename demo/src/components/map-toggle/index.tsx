import { useState } from 'react';
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
      id="map_toggle"
      className="z-[9998] pl-2 pt-1 sm:pl-3"
    >
      <label className="relative flex h-9 cursor-pointer items-center rounded-[10px] border border-white/18 bg-[rgba(17,17,17,0.88)] p-1 shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur-xl">
        <input className="peer sr-only" type="checkbox" checked={mapIsOL} onChange={handleChangeMapLibrary} />
        <span className="absolute left-1 top-1 h-[26px] w-8 rounded-md bg-[#d49511] transition-transform duration-200 peer-checked:translate-x-8" />
        <div className="relative z-10 grid h-[26px] w-8 place-items-center" title="Use Leaflet">
            <img
              src={`${import.meta.env.BASE_URL}leaflet-logo.png`}
              alt="Leaflet Icon"
              className="h-5 w-5"
            />
        </div>
        <div className="relative z-10 grid h-[26px] w-8 place-items-center" title="Use OpenLayers">
            <img
              src={`${import.meta.env.BASE_URL}ol-logo.png`}
              alt="OpenLayers Icon"
              className="h-5 w-5"
            />
        </div>
      </label>
    </div>
  );
}

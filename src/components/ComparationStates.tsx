import Brazil from "@react-map/brazil";
import { useState } from "react";

const ComparationStates = () => {
  const [map1, setMap1] = useState({
    isMinimized: false,
    selectedState: null as string | null,
  });

  const [map2, setMap2] = useState({
    isMinimized: false,
    selectedState: null as string | null,
  });

  // mapa 1
  const handleSelect1 = (state: string | null) => {
    if (state && !map1.isMinimized) {
      setMap1((prev) => ({
        ...prev,
        selectedState: state,
        isMinimized: true,
      }));
    }
  };
  const toggleMapSize1 = () => {
    setMap1((prev) => ({
      ...prev,
      isMinimized: !prev.isMinimized,
      selectedState: prev.isMinimized ? prev.selectedState : null,
    }));
  };

  // mapa 2
  const handleSelect2 = (state: string | null) => {
    if (state && !map2.isMinimized) {
      setMap2((prev) => ({
        ...prev,
        selectedState: state,
        isMinimized: true,
      }));
    }
  };

  const toggleMapSize2 = () => {
    setMap2((prev) => ({
      ...prev,
      isMinimized: !prev.isMinimized,
      selectedState: prev.isMinimized ? prev.selectedState : null,
    }));
  };

  return (
    <div className="flex gap-8 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      {/* Mapa 1 */}
      <div className="map-container">
        <div style={{ pointerEvents: map1.isMinimized ? "none" : "auto" }}>
          <Brazil
            type="select-single"
            size={
              map1.isMinimized ? 300 : Math.min(window.innerWidth * 0.8, 600)
            }
            mapColor="#B4DCFB"
            strokeColor="#000"
            strokeWidth={0.7}
            hoverColor="oklch(0.685 0.169 237.323)"
            selectColor="oklch(0.391 0.09 240.876)"
            hints={true}
            hintTextColor="white"
            hintBackgroundColor="oklch(0.391 0.09 240.876)"
            onSelect={handleSelect1}
          />
        </div>
        <button
          onClick={toggleMapSize1}
          className="mt-2 px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 mx-auto block"
        >
          {map1.isMinimized ? "Escolher outro estado" : "Reduzir mapa"}
        </button>
        {map1.selectedState && (
          <div className="text-center mt-2">
            Estado selecionado: {map1.selectedState}
          </div>
        )}
      </div>

      {/* Mapa 2 */}
      <div className="map-container">
        <div style={{ pointerEvents: map2.isMinimized ? "none" : "auto" }}>
          <Brazil
            type="select-single"
            size={
              map2.isMinimized ? 300 : Math.min(window.innerWidth * 0.8, 600)
            }
            mapColor="#B4DCFB"
            strokeColor="#000"
            strokeWidth={0.7}
            hoverColor="oklch(0.685 0.169 237.323)"
            selectColor="oklch(0.391 0.09 240.876)"
            hints={true}
            hintTextColor="white"
            hintBackgroundColor="oklch(0.391 0.09 240.876)"
            onSelect={handleSelect2}
          />
        </div>
        <button
          onClick={toggleMapSize2}
          className="mt-2 px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 mx-auto block"
        >
          {map2.isMinimized ? "Escolher outro estado" : "Reduzir mapa"}
        </button>
        {map2.selectedState && (
          <div className="text-center mt-2">
            Estado selecionado: {map2.selectedState}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparationStates;

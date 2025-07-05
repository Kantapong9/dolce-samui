
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface MapSectionProps {
  apiKey: string;
}

const MapSection = ({ apiKey }: MapSectionProps) => {
  useEffect(() => {
    if (apiKey) {
      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        initMap();
      };
      
      document.head.appendChild(script);

      return () => {
        // Only remove if script still exists
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [apiKey]);

  const initMap = () => {
    // Updated coordinates as requested
    const developmentLocation = { lat: 9.550976, lng: 100.032876 };
    
    const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 12,
      center: developmentLocation,
      mapTypeId: 'satellite',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ]
    });

    // Add marker for the development location
    const marker = new window.google.maps.Marker({
      position: developmentLocation,
      map: map,
      title: 'AquaLux Developments - Koh Samui',
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });

    // Info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">AquaLux Developments</h3>
          <p style="margin: 0; color: #374151;">Premium Pool Villas in Koh Samui</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">Drag the marker to adjust location</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    // Update coordinates when marker is dragged
    marker.addListener('dragend', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(`New coordinates: ${lat}, ${lng}`);
    });

    // Open info window by default
    infoWindow.open(map, marker);
  };

  return (
    <Card className="overflow-hidden">
      <div id="map" className="w-full h-96 lg:h-[500px]"></div>
    </Card>
  );
};

export default MapSection;

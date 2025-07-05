
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element | null, opts?: MapOptions);
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      addListener(eventName: string, handler: Function): void;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map?: Map, anchor?: Marker): void;
    }

    interface MapOptions {
      zoom?: number;
      center?: LatLngLiteral;
      mapTypeId?: string;
      styles?: MapTypeStyle[];
    }

    interface MarkerOptions {
      position?: LatLngLiteral;
      map?: Map;
      title?: string;
      draggable?: boolean;
      animation?: Animation;
    }

    interface InfoWindowOptions {
      content?: string;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers?: Array<{ visibility?: string }>;
    }

    enum Animation {
      DROP = 1
    }
  }
}

export {};

export interface Country {
  name: string;
  code: string;
}

export interface State {
  region: string;
  country: string;
  name: string;
}

export interface City {
  city: string;
  region: string;
  country: string;
  latitude: string;
  longitude: string;
}

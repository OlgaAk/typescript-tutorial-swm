import axios from "axios";
import { GOOGLE_API_KEY } from "./config";

const form = document.querySelector("form")!;
const addressInput = document.querySelector("#address")! as HTMLInputElement;

const url = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${GOOGLE_API_KEY}`;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  console.log(enteredAddress);
  console.log("testt");
  axios
    .get<GoogleGeocodingResponse>(url)
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location");
      }
      const coordinates = response.data.results[0].geometry.location;
      console.log(coordinates);
    })
    .catch((err: Error) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);

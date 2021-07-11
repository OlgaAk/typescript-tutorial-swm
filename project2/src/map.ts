import { GOOGLE_MAP_API_KEY } from "./config";

var script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
script.async = true;

document.head.appendChild(script);

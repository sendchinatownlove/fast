function removeCharFromString(stringInput, charToRemove) {
  if (stringInput === null || stringInput === undefined) {
    return null;
  }
  return stringInput.split(charToRemove).join("");
}

function decodeBase64(base64String) {
  const buf = Buffer.from(base64String, "base64");
  return buf.toString("utf8");
}

function decodeGeocache(base64Geocache) {
  const cleanBase64Geocache = removeCharFromString(base64Geocache, "🔵");

  try {
    return JSON.parse(decodeBase64(cleanBase64Geocache));
  } catch (error) {
    return {};
  }
}

export function getLatLongFromGeocache(base64Geocache) {
  const base64GeocacheJSON = decodeGeocache(base64Geocache);

  if (base64GeocacheJSON && base64GeocacheJSON.o) {
    return { lat: base64GeocacheJSON.o.lat, lng: base64GeocacheJSON.o.lng };
  }
  return {
    lat: undefined,
    lng: undefined,
  };
}

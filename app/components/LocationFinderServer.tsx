export default async function LocationFinderServer() {
    const locRes = await fetch('https://apip.cc/json');
    const loc = await locRes.json();
    const { City: city, Latitude: latitude, Longitude: longitude } = loc;
    if (latitude == null || longitude == null) {
      return <p>Unable to determine your coordinates.</p>;
    }
  
    const weatherRes = await fetch(
      `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=json`
    );
    if (!weatherRes.ok) {
      return <p>Weather lookup failed ({weatherRes.status}).</p>;
    }
    const weatherData: any = await weatherRes.json();
    const tempC = weatherData.dataseries[0].temp2m;
    const tempF = tempC * 9 / 5 + 32;
  
    return (
      <>
        <h1>Hello from {city} – server component</h1>
        <p>
          Current temperature: {tempC.toFixed(1)}°C / {tempF.toFixed(1)}°F
        </p>
      </>
    );
  }
  
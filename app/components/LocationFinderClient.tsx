'use client';

import { useEffect, useState } from 'react';

interface LocData {
  City: string;
  latitude: number;
  longitude: number;
}

export default function LocationFinderClient() {
  const [loc, setLoc] = useState<LocData | null>(null);
  const [temps, setTemps] = useState<{ c: number; f: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const locRes = await fetch('https://apip.cc/json');
        const locJson: any = await locRes.json();
        const { City, Latitude, Longitude } = locJson;
        if (Latitude == null || Longitude == null) {
          throw new Error('Unable to determine coordinates');
        }
        setLoc({ City, latitude: Latitude, longitude: Longitude });

        const weatherRes = await fetch(
          `https://www.7timer.info/bin/api.pl?lon=${Longitude}&lat=${Latitude}&product=astro&output=json`
        );
        if (!weatherRes.ok) {
          throw new Error(`Weather lookup failed (${weatherRes.status})`);
        }
        const weatherData: any = await weatherRes.json();
        const tempC = weatherData.dataseries[0].temp2m;
        const tempF = tempC * 9 / 5 + 32;

        setTemps({ c: tempC, f: tempF });
      } catch (e: any) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner" />
        <p>Loading weather…</p>
        <style jsx>{`
          .spinner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 1rem 0;
          }
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #000;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );

  if (error) return <p>{error}</p>;
  if (!loc || !temps) return null;

  return (
    <>
      <h1>Hello from {loc.City} – client component</h1>
      <p>
        Current temperature: {temps.c.toFixed(1)}°C / {temps.f.toFixed(1)}°F
      </p>
    </>
  );
}

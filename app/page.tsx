import "./../app/app.css";
import ToDo from "./components/ToDo";
import LocationFinderClient from "./components/LocationFinderClient";
import LocationFinderServer from "./components/LocationFinderServer";

export default function App() {


  return (
    <main>
      <LocationFinderClient />
      <LocationFinderServer />
      <ToDo />
    </main>
  );
}

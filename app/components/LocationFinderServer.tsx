export default async function LocationFinderServer() {

    const response = await fetch('https://apip.cc/json');
    const locationData = await response.json();
    console.log(locationData);
    const LocationInfo = locationData;

    return (
        <>
            <h1>Hello from {LocationInfo?.City} - server component</h1>
        </>
    )

}
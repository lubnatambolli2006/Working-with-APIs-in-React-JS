# Working with APIs in React JS

## React Weather App

This project demonstrates how to integrate a public API into a React JS application.

## Technologies Used

- React JS
- HTML5
- CSS3
- JavaScript
- Fetch API
- Open-Meteo API

## Features

- Search weather by city name
- Fetch data from a public API
- Display temperature
- Display humidity
- Display wind speed
- Display weather data time
- Loading message while fetching data
- Error handling for invalid cities
- Responsive design for mobile and desktop
- Enter key support for searching

## API Integration Process

1. User enters a city name.
2. The application sends a request to the geocoding API.
3. The API returns the city's latitude and longitude.
4. The application uses these coordinates to request weather data.
5. The weather API response is converted into JSON.
6. React state is updated with the weather information.
7. The weather data is displayed to the user.

## React Concepts Demonstrated

- `useState`
- Event handling
- Conditional rendering
- API requests using `fetch()`
- Async/Await
- Error handling
- Dynamic data rendering

## Project Structure

```text
Working-with-APIs-in-React-JS/
│
├── index.html
├── App.js
├── style.css
└── README.md

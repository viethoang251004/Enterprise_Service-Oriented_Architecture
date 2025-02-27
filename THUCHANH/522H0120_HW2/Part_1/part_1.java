import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Part1 {
    private static final String API_KEY = "293589a491666d3438055bf05d8f7be6";
    private static final String API_URL = "http://api.openweathermap.org/data/2.5/weather";

    public static void main(String[] args) {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

            System.out.print("Enter the city name or coordinates (latitude,longitude): ");
            String location = reader.readLine();

            String weatherData = getWeatherData(location);

            if (weatherData != null) {
                displayWeatherInfo(weatherData);
            }

        } catch (IOException e) {
            System.out.println("Error reading input: " + e.getMessage());
        }
    }

    private static String getWeatherData(String location) {
        try {
            URL url = new URL(API_URL + "?q=" + location + "&appid=" + API_KEY);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;

                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }

                reader.close();
                connection.disconnect();
                return response.toString();
            } else {
                System.out.println("Error: " + connection.getResponseCode() + " - " + connection.getResponseMessage());
            }

        } catch (IOException e) {
            System.out.println("Error fetching weather data: " + e.getMessage());
        }

        return null;
    }

    private static void displayWeatherInfo(String weatherData) {
        JsonObject jsonObject = JsonParser.parseString(weatherData).getAsJsonObject();

        JsonObject main = jsonObject.getAsJsonObject("main");
        double temperature = main.get("temp").getAsDouble();
        double humidity = main.get("humidity").getAsDouble();

        JsonArray weatherArray = jsonObject.getAsJsonArray("weather");
        JsonObject weatherObject = weatherArray.get(0).getAsJsonObject();
        String description = weatherObject.get("description").getAsString();

        System.out.println("Temperature: " + temperature + " K");
        System.out.println("Humidity: " + humidity + "%");
        System.out.println("Weather description: " + description);
    }
}
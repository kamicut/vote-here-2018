require 'csv'
require 'json'

data = CSV.read('polling_stations.csv', headers: true)

countries = {}
polling_station_locations = {}

data.each do |row|
  if !countries[row["country"]]
    countries[row["country"]] = {
      id: countries.size + 1,
      name_en: row["country_en"],
      name_ar: row["country_ar"],
      polling_stations: []
    }
  end

  if !polling_station_locations[row["polling_station_en"]]
    polling_station_locations[row["polling_station_en"]] = {
      id: polling_station_locations.size + 1,
      name_en: row["polling_station_en"],
      name_ar: row["polling_station_ar"],
      address: row["address"],
      coordinates: [row["long"], row["lat"]],
      google_maps_links: row["google_maps_links"]
    }
  end

  countries[row["country"]][:polling_stations] << {
    kalam: row["kalam"],
    location_id: polling_station_locations[row["polling_station_en"]][:id],
    districts_ids: row["districs"].gsub("-", " ").gsub("–", " ").split.map!(&:to_i)
  }
end

countries = countries.reduce({}) do |obj, key|
  obj[key[1].delete(:id)] = key[1]
  obj
end

polling_station_locations = polling_station_locations.reduce({}) do |obj, key|
  obj[key[1].delete(:id)] = key[1]
  obj
end

File.open('countries.json', 'w') { |file| file.write(countries.to_json) }
File.open('polling_station_locations.json', 'w') { |file| file.write(polling_station_locations.to_json) }

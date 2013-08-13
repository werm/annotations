json.array!(@annotations) do |annotation|
  json.extract! annotation, :point_id, :top, :left, :note, :url
  json.url annotation_url(annotation, format: :json)
end

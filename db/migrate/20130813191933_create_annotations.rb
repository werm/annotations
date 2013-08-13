class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :point_id
      t.integer :top
      t.integer :left
      t.text :note
      t.string :url

      t.timestamps
    end
  end
end

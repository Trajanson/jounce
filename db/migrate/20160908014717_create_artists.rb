class CreateArtists < ActiveRecord::Migration[5.0]
  def change
    create_table :artists do |t|
      t.string :name
      t.string :artist_image_path

      t.timestamps null: false
    end
  end
end

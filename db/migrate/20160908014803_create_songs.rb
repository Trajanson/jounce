class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :path
      t.string :title
      t.integer :artist_id
      t.integer :album_id

      t.integer :duration

      t.timestamps null: false      
    end
  end
end

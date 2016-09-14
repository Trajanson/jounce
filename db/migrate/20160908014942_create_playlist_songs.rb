class CreatePlaylistSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :playlist_songs do |t|
      t.integer :playlist_id
      t.integer :song_id

      t.timestamps null: false      
    end
  end
end

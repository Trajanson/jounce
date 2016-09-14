class CreateSongPlays < ActiveRecord::Migration[5.0]
  def change
    create_table :song_plays do |t|
      t.integer :user_id
      t.integer :song_id

      t.timestamps null: false      
    end
  end
end

class CreateSongRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :song_ratings do |t|
      t.integer :user_id
      t.integer :song_id
      t.integer :rating

      t.timestamps null: false      
    end
  end
end

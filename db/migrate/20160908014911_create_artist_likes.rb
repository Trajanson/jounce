class CreateArtistLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :artist_likes do |t|
      t.integer :user_id
      t.integer :artist_id

      t.timestamps null: false      
    end
  end
end

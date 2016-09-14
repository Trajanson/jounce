class CreatePlaylistLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :playlist_likes do |t|
      t.integer :user_id
      t.integer :playlist_id

      t.timestamps null: false      
    end
  end
end

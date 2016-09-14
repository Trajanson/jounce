class CreatePlaylists < ActiveRecord::Migration[5.0]
  def change
    create_table :playlists do |t|
      t.string :name
      t.integer :creator_id

      t.timestamps null: false
    end
  end
end

class CreateFriendships < ActiveRecord::Migration[5.0]
  def change
    create_table :friendships do |t|
      t.integer :friender_id
      t.integer :friendee_id

      t.timestamps null: false      
    end
  end
end

class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :provider
      t.string :uid
      t.string :oauth_token
      t.string :oauth_expires_at

      t.string :profile_image_url, default: "images/default_avatar.jpg"

      t.string :email

      t.boolean :is_premium, default: false

      t.timestamps null: false      
    end
  end
end

class Friendship < ActiveRecord::Base

  belongs_to(
    :friender,
    primary_key: :id,
    foreign_key: :friender_id,
    class_name: "User"
  )

  belongs_to(
    :friendee,
    primary_key: :id,
    foreign_key: :friendee_id,
    class_name: "User"
  )

end

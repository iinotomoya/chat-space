class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  ＃下多分変数変えないといけない

   validates :message, presence: true, unless: :image?
e
end

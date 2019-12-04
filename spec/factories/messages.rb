FactoryBot.define do
  factory :message do
    message {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpeg")}
    user
    group
  end
end

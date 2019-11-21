# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|nickname|string|null: false, index: true|
|addless|VARCHAR|null: false|
|password|VARCHAR|null: false|
### Association
- has_many :messages
- has_many :groups, through::groups_users


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|
|message|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
### Association
- be_long :user
- be_long :group
<!-- バリデーションで,メッセージと画像がどちらもない場合投稿できないようにする。-->


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|group-name|string|null: false, index: true|
### Association
- has_many :messages
- has_many :users, through: :groups_users


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- be_long :user
- be_long :message


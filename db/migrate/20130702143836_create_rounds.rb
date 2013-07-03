class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.references :player
      t.references :match
    end
  end
end

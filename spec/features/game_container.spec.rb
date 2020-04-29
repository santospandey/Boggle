require "rails_helper"

RSpec.configure do |config|
    config.include RSpec::Rails::RequestExampleGroup, type: :feature
end

RSpec.describe "Game Container Testing" do
    describe "GET /random_characters" do
        it "returns random characters" do
            get("/random_characters")
            json = JSON.parse(response.body)
            expect(json["board"].length).to eql(4)
        end
    end
end


# RSpec.describe "list players" do
#     it "displays first name and last name from the players saved" do
#         player1 = Player.create(first_name: "Edwardo", last_name: "Brook")
#         player2 = Player.create(first_name: "Micheel", last_name: "Gollw")

#         visit "/"

#         expect(page).to have_text("Edwardo")
#         expect(page).to have_text("Brook")
#         expect(page).to have_text("Micheel")
#         expect(page).to have_text("Gollw")

#         expect(page).to have_link("New Player")

#     end
# end


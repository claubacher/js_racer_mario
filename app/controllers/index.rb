get '/' do
  session.clear
  erb :index
end

post '/race' do
  @match = Match.create()

  player1 = Player.find_or_create_by_name(params[:p1][:name])
  player1.icon = Icon.find_by_path(params[:p1][:icon])
  player2 = Player.find_or_create_by_name(params[:p2][:name])
  player2.icon = Icon.find_by_path(params[:p2][:icon])

  @match.players << player1
  @match.players << player2

  session[:match_id] = @match.id

  erb :race
end

post '/winner' do
  @winner = Player.find_by_name(params["winner"])
  @winner.wins = @winner.wins.to_i + 1
  @winner.save

  @match = Match.find(session[:match_id])
  @match.winner_id = @winner.id
  @match.save

  puts @winner.inspect
  puts @match.inspect

  erb :winner, :layout => false
end
# Piltover's Most Wanted

This website is designed to pick the top banned champions from ranked games that occurred during the recent URF mode. The website calculates how many times they’ve been banned and collects player to player champion mastery while displayed in a fun, unique environment.

## Riot API Challenge
See the Riot API Challenge [here](https://developer.riotgames.com/discussion/announcements/show/eoq3tZd1).
View the API Challenge rules [here](https://developer.riotgames.com/api-challenge-rules).

## Testing
You can see this live by running it through [rawgit](https://rawgit.com/victhebeast/Piltover-s-Most-Wanted/master/index.html).

The database is powered by Firebase can you can browse it live [here](https://pilt-most-want.firebaseio.com).

## Code Logic
![Code logic diagram](https://github.com/victhebeast/Piltover-s-Most-Wanted/raw/master/CodeLogic.png)
I suck at drawing, so sorry if it looks bad. I explain it below anyways.

I've selected the URF weekend of 4/22 - 4/25 because most of the people play URF (obviously). Only serious people play ranked that weekend. So, this way (theoretically) I would eliminate most of troll games and such. I manually inputted 1 challenger and 1 master play into my database and let my script run (it's commented out now) and ran a tree based search algorithm. Essentially the way it works is that I look at all his ranked games that weekend and find all the other summoners in those games. Then I go and get all the games that weekend for those people and find all the players in those games and repeat the process. Theoretically, this should find every player of ranked that weekend, because sometime someone has played with someone that played with someone, etc.Now each game I go through, I also log each banned champion and how many times. Then for each champion I go through every summoner I looked previously and get champion mastery points and level. Afterwards I generate na average and show on the summoner icon along with ban percentage.

## Frameworks used
[jquery-circle-progress](https://github.com/kottenator/jquery-circle-progress)
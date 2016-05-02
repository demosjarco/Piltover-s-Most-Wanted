// https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/44838497?beginTime=1461351600000&endTime=1461610800000&api_key=

var firebaseRef = new Firebase("https://pilt-most-want.firebaseio.com/");

firebaseRef.child("apiControl/apiKey").once("value", function(key) {
	/*firebaseRef.child("bannedChamps/0/champlevels").update({
		44838497: 5
	});*/
	
	function goThroughSummonerList() {
		firebaseRef.child("summonerIds").once("value", function(summonerIds) {
			var summonerList = summonerIds.val();
			
			var addedNewGames = false;
			var counter1 = 0;
			function manualForLoop1(arr) {
				var summoner = summonerList[arr[counter1]];
				counter1++;
				
				if (!summoner["checked"]) {
					console.log(summoner);
					
					$.ajax({
						type: 'GET',
						url: 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/' + summoner["summonerId"] + '?beginTime=1461351600000&endTime=1461610800000&api_key=' + key.val(),
						async: true,
						error: function(errorContent) {
							// Just skip
							if (counter1 < Object.keys(summonerList).length) {
								manualForLoop1(Object.keys(summonerList));
							}
						},
						dataType: 'json',
						success: function(data) {
							console.log(data);
							
							if (data["totalGames"] > 0) {
								// For each game, check matchId if exists in matchIds
								// var b = firebaseRef.child("matchIds").child(INSERT MATCH ID HERE).exists(); b is boolean
								// If no -> add to database and change addedNewGames to true
							} else {
								// No games played this period
								firebaseRef.child("summonerIds/" + summoner["summonerId"]).update({
									checked: true
								});
							}
							
							// Step through summoner list
							if (counter1 < Object.keys(summonerList).length) {
								manualForLoop1(Object.keys(summonerList));
							} else {
								if (addedNewGames) {
									// Go get the new matches
									goThroughMatchList();
								}
							}
						},
					});
				} else {
					// Step through summoner list
					if (counter1 < Object.keys(summonerList).length) {
						manualForLoop1(Object.keys(summonerList));
					} else {
						if (addedNewGames) {
							// Go get the new matches
							goThroughMatchList();
						}
					}
				}
			}
			// Run first time
			manualForLoop1(Object.keys(summonerList));
		});
	}
	// Run first time
	goThroughSummonerList();
	
	function goThroughMatchList() {
	}
	// Run first time
	goThroughMatchList();
});
// Presenting the content
var firebaseRef = new Firebase("https://pilt-most-want.firebaseio.com/");

function loadUI() {
	// Disable until finished loading
	$("#numberOfBannedChampsToLoad").prop("disabled", true);
	clearGrid();
	
	// Seems redundant but it wont work otherwise...sigh -_-
	var numberToLoad = 0;
	for (var i = 0; i < $("#numberOfBannedChampsToLoad").val(); i++) {
		numberToLoad++;
	}
	var count = 0;
	
	firebaseRef.child("matchIds").once("value", function(snapshot3) {
		var numberOfGames = Object.keys(snapshot3.val()).length;
		
		firebaseRef.child("bannedChamps").once("value", function(snapshot2) {
			$("#numberOfBannedChampsToLoad").attr({"max": Object.keys(snapshot2.val()).length});
			//firebaseRef.child("bannedChamps").orderByChild("timesBanned").limitToLast(numberToLoad).on("child_changed", function(snapshot) {
			firebaseRef.child("bannedChamps").orderByChild("timesBanned").limitToLast(numberToLoad).on("child_added", function(snapshot) {
				count++;
				var percentage = (snapshot.val()["timesBanned"] / numberOfGames);
				var nicePercentage = Math.round(percentage * 1000) / 10;
				
				var averageChampLevel = 1;
				var averageChampPoints = snapshot.val()["championPoints"] / snapshot.val()["summonersForAverage"];
				var outOfChampPoints = 0;
				if (averageChampPoints < 1800) {
					// Level 1
					averageChampLevel = 1;
					outOfChampPoints = 1800;
				} else if (averageChampPoints >= 1800 && averageChampPoints < 6000) {
					// Level 2
					averageChampLevel = 2;
					outOfChampPoints = 6000;
				} else if (averageChampPoints >= 6000 && averageChampPoints < 12600) {
					// Level 3
					averageChampLevel = 3;
					outOfChampPoints = 12600;
				} else if (averageChampPoints >= 12600 && averageChampPoints < 21600) {
					// Level 4
					averageChampLevel = 4;
					outOfChampPoints = 21600;
				} else if (averageChampPoints >= 21600) {
					// Level 5
					averageChampLevel = 5;
					outOfChampPoints = averageChampPoints;
				}
				
				$(".item." + snapshot.val()["champId"]).remove();
				$("#grid").append('<div class="item ' + snapshot.val()["champId"] + '"><div class="champImage ' + snapshot.val()["champId"] + '"></div><span class="banPercent">' + nicePercentage + '%</span><span class="champLevel">Level ' + averageChampLevel + '</span></div>');
				$(".champImage." + snapshot.val()["champId"]).circleProgress({
					value: averageChampPoints / outOfChampPoints,
					size: 102,
					fill: {
						color: "#0a968b"
					}
				});
				setTimeout(function(){loadChampImage(snapshot.val()["champId"])}, 0);
				
				// Enable it now that it's finished loading everything
				if (count == $("#numberOfBannedChampsToLoad").val()) {
					$("#numberOfBannedChampsToLoad").prop("disabled", false);
				}
			});
		});
	});
}
// Load first time
loadUI();

function clearGrid() {
	$("#grid").empty();
}

function loadChampImage(champId) {
	firebaseRef.child("apiControl").once("value", function(snapshot) {
		$.ajax({
			type: 'GET',
			url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + champId + '?champData=image&api_key=' + snapshot.val()["apiKey"],
			async: true,
			error: function(errorContent) {
				console.log(errorContent);
			},
			dataType: 'json',
			success: function(data) {
				$(".champImage." + champId).css("background-image", "url(https://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/" + data["image"]["full"] + ")");
			},
		});
	});
}
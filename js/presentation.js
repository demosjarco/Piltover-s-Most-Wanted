// Presenting the content
function loadUI() {
	// Disable until finished loading
	$("#numberOfBannedChampsToLoad").prop("disabled", true);
	clearGrid();
	
	var firebaseRef = new Firebase("https://pilt-most-want.firebaseio.com/");
	
	var count = 0;
	
	firebaseRef.child("bannedChamps").orderByChild("timesBanned").on("child_added", function(snapshot) {
		count++;
		$("#numberOfBannedChampsToLoad").attr({"max": count});
		
		// Enable it now that it's finished loading everything
		firebaseRef.child("bannedChamps").once("value", function(snapshot2) {
			if (count >= Object.keys(snapshot2.val()).length) {
				$("#numberOfBannedChampsToLoad").prop("disabled", false);
			}
		});
	});
}
// Load first time
loadUI();

function clearGrid() {
}
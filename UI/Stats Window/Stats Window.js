function showStats() {
	if (Level < 60) {
		PureStats = 8+(Level*5)
	} else if (Level >= 60 && Level < 100) {
		PureStats = 8+(Level*5)+5
	} else if (Level > 100) {
		PureStats = 8+(Level*5)+5+5
	};
	var Stats = document.createElement("p");
	Stats.className = "Stats2";
	Stats.innerText = PureStats;
	$("#Stats").append(Stats)
}
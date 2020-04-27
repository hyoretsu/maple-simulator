$(document).ready(function() {
    $(".Tabs").tabs({
        activate: function (event, ui) {
			var active = $(".Tabs").tabs("option", "active")
		}
    });
	
});
var Zero = 0
function clearClass() {
	$(".Exclusive").remove();
	$("#EquipmentInventory .Selection, #EquipInv > div").css("visibility", "hidden");
	$("#EquipInv_EquipButtonSelected, #NormalEquipInv, .Disappear").css("visibility", "visible");
	$(".NormalCash").css("visibility", "visible");
	Zero = 0
}
function runStats() {
	$(".Stats script", ".Stats .Stats2").remove();
	$(".Stats").append(StatsScript);
	showStats()
}
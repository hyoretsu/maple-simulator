$(document).ready(function() {
    $("#LevelSelect").change(function() {
		Level = $(this).val();
		if (Level > 140 && Commerci !== 1) {
			$("#EquipInvButtons").append(CommerciVessel);
			Commerci = 1
		} else if (Level < 140) {
			$("#CommerciVesselIcon").remove()
		};
		if (Level >= 200 && Level < 225 && VanishingJourney !== 1) {
			$("#EquipmentInventory .ArcaneInv").remove();
			$("#EquipmentInventory").append(ArcaneInv)
        } else if (Level >= 225 && Arcana !== 1) {
			$("#EquipmentInventory .ArcaneInv").remove();
			$("#EquipmentInventory").append(ArcaneInv2);
			$("#ArcaneEquipInv_Slot4").append(ArcanaSymbol);
			Arcana = 1
			VanishingJourney = 1; ChuChu = 1; Lachelein = 1
		};
		if (Level >= 200 && VanishingJourney !== 1) {
			$("#EquipInvButtons").append(ArcaneInvButton);
			$("#ArcaneEquipInv_Slot1").append(VanishingJourneySymbol);
			VanishingJourney = 1
        };
		if (Level >= 210 && ChuChu !== 1) {
			$("#ArcaneEquipInv_Slot2").append(ChuChuSymbol);
			ChuChu = 1
		};
		if (Level >= 220 && Lachelein !== 1) {
			$("#ArcaneEquipInv_Slot3").append(LacheleinSymbol);
			Lachelein = 1
		};
		if (Level >= 230 && Morass !== 1) {
			$("#ArcaneEquipInv_Slot5").append(MorassSymbol);
			Morass = 1
		};
		if (Level >= 235 && Esfera !== 1) {
			$("#ArcaneEquipInv_Slot6").append(EsferaSymbol);
			Esfera = 1
		};
		if (Level < 200) {
			$("#EquipInv_ArcaneForce").remove()
		}
    })
});
{/*Repeatables*/
function selectionUnselection() {
	$("#EquipInvButtons .Selectable").attr("src", $("#EquipmentInventory .Selectable").attr("src").replace("_A.png",".png")).removeClass("Selectable").addClass("Unselected");
	$("#EquipInvButtons .Unselected").css("top", "23px");
	$("#EquipInv > div, #CashEquipInvZeroBeta").css("visibility", "hidden");
	$(".Disappear").css("visibility", "hidden")
}
}
function equipSelectable() {
	selectionUnselection();
	$("#EquipInvButtons .Unselected").css("top", "23px")
	$("#NormalEquipInv, .Disappear").css("visibility", "visible");
}
function equipCashSelectable() {
	selectionUnselection();
	$("#EquipInv_CashButtonSelected, #CashEquipInv").css("visibility", "visible");
	if (Zero == 1) {
		$(".NormalCash").css("visibility", "hidden");
		$("#CashEquipInvZero, #CashEquipInvZeroBeta").css("visibility", "visible")
	} else {
		$("#EquipInvButtons .Unselected").css("top", "23px")
		$("#CashEquipInv").css("visibility", "visible")
	}
}
function equipPetSelectable() {
	if ($("#EquipInv_PetButton").hasClass("Unselected")) {
		selectionUnselection();
		$("#PetEquipInv").css("visibility", "visible")
	}
}
function equipAndroidSelectable() {
	selectionUnselection();
	$("#EquipInvButtons .Unselected").css("top", "23px")
	$("#AndroidEquipInv").css("visibility", "visible");
}
function equipDragonSelectable() {
	selectionUnselection();
	$("#EquipInv_DragonButtonSelected, #DragonEquipInv").css("visibility", "visible");
}
function equipHakuSelectable() {
	selectionUnselection();
	$("#EquipInv_HakuButtonSelected, #HakuEquipInv").css("visibility", "visible");
}
function equipMechSelectable() {
	selectionUnselection();
	$("#EquipInv_MechButtonSelected, #MechEquipInv").css("visibility", "visible");
}
function arcaneForceShow() {
	$("#EqupiInv").append(ArcaneInv)
}
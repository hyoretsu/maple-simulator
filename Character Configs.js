$(document).ready(function() {
    $("#CharSelect").change(function() {
        var Character = $(this).val();
        if (Character == "AngelicBuster") {
			isAngelicBuster()
		} else if (Character == "Aran") {
			isAran()
		} else if (Character == "Ark") {
			isArk()
		} else if (Character == "BattleMage") {
			isBattleMage()
		} else if (Character == "BeastTamer") {
			isBeastTamer()
		} else if (Character == "Bishop") {
			isBishop()
		} else if (Character == "Blaster") {
			isBlaster()
		} else if (Character == "BlazeWizard") {
			isBlazeWizard()
		} else if (Character == "Bowmaster") {
			isBowmaster()
		} else if (Character == "Buccaneer") {
			isBuccaneer()
		} else if (Character == "Cadena") {
			isCadena()
		} else if (Character == "Cannoneer") {
			isCannoneer()
		} else if (Character == "Corsair") {
			isCorsair()
		} else if (Character == "DarkKnight") {
			isDarkKnight()
		} else if (Character == "DawnWarrior") {
			isDawnWarrior()
		} else if (Character == "DemonAvenger") {
			isDemonAvenger()
		} else if (Character == "DemonSlayer") {
			isDemonSlayer()
		} else if (Character == "DualBlade") {
			isDualBlade()
		} else if (Character == "Evan") {
			isEvan()
		} else if (Character == "FPMage") {
			isFPMage()
		} else if (Character == "Hayato") {
			isHayato()
		} else if (Character == "Hero") {
			isHero()
		} else if (Character == "Hoyoung") {
			isHoyoung()
		} else if (Character == "ILMage") {
			isILMage()
		} else if (Character == "Illium") {
			isIllium()
		} else if (Character == "Jett") {
			isJett()
		} else if (Character == "Kaiser") {
			isKaiser()
		} else if (Character == "Kanna") {
			isKanna()
		} else if (Character == "Kinesis") {
			isKaiser()
		} else if (Character == "Luminous") {
			isLuminous()
		} else if (Character == "Marksman") {
			isMarksman()
		} else if (Character == "Mechanic") {
			isMechanic()
		} else if (Character == "Mercedes") {
			isMercedes()
		} else if (Character == "Mihile") {
			isMihile()
		} else if (Character == "NightLord") {
			isNightLord()
		} else if (Character == "NightWalker") {
			isNightWalker()
		} else if (Character == "Paladin") {
			isPaladin()
		} else if (Character == "Pathfinder") {
			isPathfinder()
		} else if (Character == "Phantom") {
			isPhantom()
		} else if (Character == "Shade") {
			isShade()
		} else if (Character == "Shadower") {
			isShadower()
		} else if (Character == "ThunderBreaker") {
			isThunderBreaker()
		} else if (Character == "WildHunter") {
			isWildHunter()
		} else if (Character == "WindArcher") {
			isWindArcher()
		} else if (Character == "Xenon") {
			isXenon()
		} else if (Character == "Zero") {
			isZero()
		}
    })
})
function isAngelicBuster() {
	clearClass()
	$("#EquipInv").append(AngelicBusterInv)
	AngelicBuster = 1
}
function isAran() {
	clearClass()
}
function isArk() {
	clearClass()
}
function isBattleMage() {
	clearClass()
}
function isBeastTamer() {
	clearClass()
}
function isBishop() {
	clearClass()
}
function isBlaster() {
	clearClass()
}
function isBlazeWizard() {
	clearClass()
}
function isBowmaster() {
	clearClass()
}
function isBuccaneer() {
	clearClass()
}
function isCadena() {
	clearClass()
}
function isCannoneer() {
	clearClass()
}
function isCorsair() {
	clearClass()
}
function isDarkKnight() {
	clearClass()
}
function isDawnWarrior() {
	clearClass()
}
function isDemonAvenger() {
	clearClass()
}
function isDemonSlayer() {
	clearClass()
}
function isDualBlade() {
	clearClass()
}
function isEvan() {
	clearClass()
	$("#EquipInvButtons").append(EvanInvButton)
	$("#EquipInv").append(EvanInv)
}
function isFPMage() {
	clearClass()
}
function isHayato() {
	clearClass()
}
function isHero() {
	clearClass()
}
function isHoyoung() {
	clearClass()
}
function isILMage() {
	clearClass()
}
function isIllium() {
	clearClass()
}
function isJett() {
	clearClass()
}
function isKaiser() {
	clearClass()
}
function isKanna() {
	clearClass()
	$("#EquipInvButtons").append(KannaInvButton)
	$("#EquipInv").append(KannaInv)
}
function isKinesis() {
	clearClass()
}
function isLuminous() {
	clearClass()
}
function isMarksman() {
	clearClass()
}
function isMechanic() {
	clearClass()
	$("#EquipInvButtons").append(MechanicInvButton)
	$("#EquipInv").append(MechanicInv)
}
function isMercedes() {
	clearClass()
}
function isMihile() {
	clearClass()
}
function isNightLord() {
	clearClass()
}
function isNightWalker() {
	clearClass()
}
function isPaladin() {
	clearClass()
	Explorer = 1
}
function isPathfinder() {
	clearClass()
}
function isPhantom() {
	clearClass()
}
function isShade() {
	clearClass()
}
function isShadower() {
	clearClass()
}
function isThunderBreaker() {
	clearClass()
}
function isWildHunter() {
	clearClass()
}
function isWindArcher() {
	clearClass()
}
function isXenon() {
	clearClass()
	$("#NormalEquipInv").append(XenonSlot)
}
function isZero() {
	clearClass()
	$("#EquipInv").append(ZeroInv);	
	$("#EquipmentInventory").append(ZeroInv2);
	$("#EquipInvButtons").append(ZeroWepButton);
	Zero = 1
}
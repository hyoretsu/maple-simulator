"use client";
import { useFetch } from "@hyoretsu/react-hooks";
import { Equipment } from "@prisma/client";
import Image from "next/image";
import { useMemo, useState } from "react";

import Button from "@components/Button";
import Window from "@components/Window";

import { useCharInfo, useEquips, useFuncs } from "@context/char";
import api from "@services/api";

import Arrow from "@assets/Arrow.svg";

import {
	Background,
	BottomSection,
	EquipChooser,
	EquipChooserSlot,
	EquipSlots,
	ExtraButtons,
	MiscButtons,
	ScrollDiv,
	Slot,
	Tab,
	TopBar,
} from "./styles";

const EquipmentInventory: React.FC = () => {
	const equips = useEquips();
	const { job } = useCharInfo();
	const { updateEquips } = useFuncs();

	const [chooserEquipType, setChooserEquipType] = useState("");
	const [isModalVisible, setModalVisible] = useState(false);

	const showChooser = (type: string) => {
		setChooserEquipType(type);

		setModalVisible(true);
	};

	const closeChooser = () => {
		setChooserEquipType("");

		setModalVisible(false);
	};

	const { data: chooserData } = useFetch(
		// @ts-ignore
		// Having 'chooserEquipType' in the dependency array makes for better UX by not showing previous results
		chooserEquipType ? ["/equips/filter", chooserEquipType] : null,
		api,
		{
			job,
			type: chooserEquipType.split(/\d/)[0],
		},
	);
	const chooserEquips = useMemo(() => (chooserData as Equipment[]) || [], [chooserData]);

	return (
		<Window title="Equipment Inventory" size={[232, 354]}>
			{isModalVisible && (
				<EquipChooser onClose={closeChooser}>
					<ScrollDiv>
						{chooserEquips.map((equip) => (
							<EquipChooserSlot key={equip.id}>
								<button
									type="button"
									onClick={() => {
										updateEquips(chooserEquipType, equip.id);
										closeChooser();
									}}
								>
									<Image
										src={equip.icon}
										alt={equip.name}
										title={equip.name}
										width={equip.iconWidth}
										height={equip.iconHeight}
									/>
								</button>
							</EquipChooserSlot>
						))}
					</ScrollDiv>
				</EquipChooser>
			)}

			<Background job={job}>
				<TopBar>
					<Tab active>Equip</Tab>
					<Tab>Cash</Tab>
					<Tab>Pet</Tab>
					<Tab>Ad</Tab>
				</TopBar>
				<EquipSlots>
					<div>
						<Slot
							background="#a98"
							onClick={() => {
								showChooser("Ring4");
							}}
						>
							<span>Ring</span>
							<Image
								src={equips.ring4?.icon}
								alt={equips.ring4?.name}
								width={equips.ring4?.iconWidth}
								height={equips.ring4?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#a98"
							onClick={() => {
								showChooser("Ring3");
							}}
						>
							<span>Ring</span>
							<Image
								src={equips.ring3?.icon}
								alt={equips.ring3?.name}
								width={equips.ring3?.iconWidth}
								height={equips.ring3?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#a98"
							onClick={() => {
								showChooser("Ring2");
							}}
						>
							<span>Ring</span>
							<Image
								src={equips.ring2?.icon}
								alt={equips.ring2?.name}
								width={equips.ring2?.iconWidth}
								height={equips.ring2?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#a98"
							onClick={() => {
								showChooser("Ring1");
							}}
						>
							<span>Ring</span>
							<Image
								src={equips.ring1?.icon}
								alt={equips.ring1?.name}
								width={equips.ring1?.iconWidth}
								height={equips.ring1?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Pocket");
							}}
						>
							<span>Pocket</span>
							<Image
								src={equips.pocket?.icon}
								alt={equips.pocket?.name}
								width={equips.pocket?.iconWidth}
								height={equips.pocket?.iconHeight}
							/>
						</Slot>
						<Slot background="#999">
							<span>Book</span>
							<Image
								src={equips.book?.icon}
								alt={equips.book?.name}
								width={equips.book?.iconWidth}
								height={equips.book?.iconHeight}
							/>
						</Slot>
					</div>
					<div>
						<Slot style={{ cursor: "default" }} />
						<Slot
							background="#8ab"
							onClick={() => {
								showChooser("Pendant2");
							}}
						>
							<span>Pendant</span>
							<br />
							<span style={{ fontSize: "0.85em" }}>©</span>
							<Image
								src={equips.pendant2?.icon}
								alt={equips.pendant2?.name}
								width={equips.pendant2?.iconWidth}
								height={equips.pendant2?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#8ab"
							onClick={() => {
								showChooser("Pendant1");
							}}
						>
							<span>Pendant</span>
							<Image
								src={equips.pendant1?.icon}
								alt={equips.pendant1?.name}
								width={equips.pendant1?.iconWidth}
								height={equips.pendant1?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#666"
							onClick={() => {
								showChooser("Weapon");
							}}
						>
							<span>Weapon</span>
							<Image
								src={equips.weapon?.icon}
								alt={equips.weapon?.name}
								width={equips.weapon?.iconWidth}
								height={equips.weapon?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Belt");
							}}
						>
							<span>Belt</span>
							<Image
								src={equips.belt?.icon}
								alt={equips.belt?.name}
								width={equips.belt?.iconWidth}
								height={equips.belt?.iconHeight}
							/>
						</Slot>
						<Slot style={{ cursor: "default" }} />
					</div>
					<div>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Hat");
							}}
						>
							<span>Hat</span>
							<Image
								src={equips.hat?.icon}
								alt={equips.hat?.name}
								width={equips.hat?.iconWidth}
								height={equips.hat?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Face Accessory");
							}}
						>
							<span>Face</span>
							<Image
								src={equips.faceAcc?.icon}
								alt={equips.faceAcc?.name}
								width={equips.faceAcc?.iconWidth}
								height={equips.faceAcc?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Eye Accessory");
							}}
						>
							<span>Eye</span>
							<br />
							<span>Acc</span>
							<Image
								src={equips.eyeAcc?.icon}
								alt={equips.eyeAcc?.name}
								width={equips.eyeAcc?.iconWidth}
								height={equips.eyeAcc?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Top");
							}}
						>
							<span>Top</span>
							<Image
								src={equips.top?.icon}
								alt={equips.top?.name}
								width={equips.top?.iconWidth}
								height={equips.top?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Bottom");
							}}
						>
							<span>Bottom</span>
							<Image
								src={equips.bottom?.icon}
								alt={equips.bottom?.name}
								width={equips.bottom?.iconWidth}
								height={equips.bottom?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Shoes");
							}}
						>
							<span>Shoes</span>
							<Image
								src={equips.shoes?.icon}
								alt={equips.shoes?.name}
								width={equips.shoes?.iconWidth}
								height={equips.shoes?.iconHeight}
							/>
						</Slot>
					</div>
					<div>
						<Slot style={{ cursor: "default" }} />
						<Slot style={{ cursor: "default" }} />
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Ear");
							}}
						>
							<span>Ear</span>
							<br />
							<span>Acc</span>
							<Image
								src={equips.earrings?.icon}
								alt={equips.earrings?.name}
								width={equips.earrings?.iconWidth}
								height={equips.earrings?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Shoulder");
							}}
							style={{ fontSize: "0.4em" }}
						>
							<span>Shoulder</span>
							<Image
								src={equips.shoulder?.icon}
								alt={equips.shoulder?.name}
								width={equips.shoulder?.iconWidth}
								height={equips.shoulder?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Gloves");
							}}
						>
							<span>Gloves</span>
							<Image
								src={equips.gloves?.icon}
								alt={equips.gloves?.name}
								width={equips.gloves?.iconWidth}
								height={equips.gloves?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#889"
							onClick={() => {
								showChooser("Android");
							}}
						>
							<span>Android</span>
							<Image
								src={equips.android?.icon}
								alt={equips.android?.name}
								width={equips.android?.iconWidth}
								height={equips.android?.iconHeight}
							/>
						</Slot>
					</div>
					<div>
						<Slot
							background="#8ab"
							onClick={() => {
								showChooser("Emblem");
							}}
						>
							<span>Emblem</span>
							<Image
								src={equips.emblem?.icon}
								alt={equips.emblem?.name}
								width={equips.emblem?.iconWidth}
								height={equips.emblem?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#8ab"
							onClick={() => {
								showChooser("Badge");
							}}
						>
							<span>Badge</span>
							<Image
								src={equips.badge?.icon}
								alt={equips.badge?.name}
								width={equips.badge?.iconWidth}
								height={equips.badge?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#8ab"
							onClick={() => {
								showChooser("Medal");
							}}
						>
							<span>Medal</span>
							<Image
								src={equips.medal?.icon}
								alt={equips.medal?.name}
								width={equips.medal?.iconWidth}
								height={equips.medal?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#666"
							onClick={() => {
								showChooser("Secondary");
							}}
						>
							<span>Sub</span>
							<br />
							<span>Weapon</span>
							<Image
								src={equips.secondary?.icon}
								alt={equips.secondary?.name}
								width={equips.secondary?.iconWidth}
								height={equips.secondary?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#999"
							onClick={() => {
								showChooser("Cape");
							}}
						>
							<span>Cape</span>
							<Image
								src={equips.cape?.icon}
								alt={equips.cape?.name}
								width={equips.cape?.iconWidth}
								height={equips.cape?.iconHeight}
							/>
						</Slot>
						<Slot
							background="#889"
							onClick={() => {
								showChooser("Mechanical Heart");
							}}
						>
							<span>Heart</span>
							<Image
								src={equips.heart?.icon}
								alt={equips.heart?.name}
								width={equips.heart?.iconWidth}
								height={equips.heart?.iconHeight}
							/>
						</Slot>
					</div>
				</EquipSlots>
				<BottomSection>
					<ExtraButtons>
						<Button
							border="#5f91a8"
							colors={["#33ddff", "#1199cc"]}
							size={[49, 13]}
							style={{ marginRight: "auto" }}
						>
							<Arrow style={{ transform: "rotate(-90deg)" }} />
							<span>Weapon</span>
						</Button>
						<Button
							border="#5f91a8"
							colors={["#33ddff", "#1199cc"]}
							size={[55, 13]}
							style={{ marginRight: 2 }}
						>
							<span>Sacred</span>
							<Arrow style={{ transform: "rotate(90deg)" }} />
						</Button>
						<Button border="#5f91a8" colors={["#33ddff", "#1199cc"]} size={[47, 13]}>
							<span>Arcane</span>
							<Arrow style={{ transform: "rotate(90deg)" }} />
						</Button>
					</ExtraButtons>
					<MiscButtons>
						<Button border="#e79148" colors={["#ffd556", "#ee930f"]} size={[55, 16]}>
							<span>Effect</span>
						</Button>
						<Button
							border="#e79148"
							colors={["#ffd556", "#ee930f"]}
							size={[55, 16]}
							style={{ marginLeft: 2 }}
						>
							<span>Salon</span>
						</Button>
						<Button
							border="#e79148"
							colors={["#ffd556", "#ee930f"]}
							size={[55, 16]}
							style={{ marginLeft: "auto" }}
						>
							<span>Vessel</span>
						</Button>
					</MiscButtons>
				</BottomSection>
			</Background>
		</Window>
	);
};

export default EquipmentInventory;

import { CompleteEquipment } from "@modules/equipments/repositories/equipments.repository";

const transformItem = (item: CompleteEquipment): CompleteEquipment => {
	const { icon } = item;

	return {
		...item,
		icon: `${process.env.CDN_URL}/${icon}`,
	};
};

export default transformItem;

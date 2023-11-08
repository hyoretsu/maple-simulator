import { Icon } from "@prisma/client";

interface IconEntity {
	icon: Icon;
}

export type EntityWithIconUrl<T> = T & {
	icon: Omit<Icon, "file"> & {
		url: string;
	};
};

const addIconUrl = <Entity extends IconEntity>(item: Entity): EntityWithIconUrl<Entity> => {
	const { icon } = item;

	return {
		...item,
		icon: {
			...icon,
			url: `${process.env.CDN_URL}/${icon.file}`,
		},
	};
};

export default addIconUrl;

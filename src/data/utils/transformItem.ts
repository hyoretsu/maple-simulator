import { Prisma } from '@prisma/client';

type Item = Prisma.EquipmentGetPayload<{ include: { req: true; stats: true } }> | null;

const transformItem = (item: Item): Item => {
    const { icon } = item;

    return {
        ...item,
        icon: process.env.CDN_URL + icon,
    };
};

export default transformItem;

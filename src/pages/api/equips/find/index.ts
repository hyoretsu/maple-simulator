import transformItem from 'data/utils/transformItem';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@services/prisma';

interface Body {
    id: number | number[];
}

export default async function handler(req: NextApiRequest<Body>, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case 'POST': {
            const { id } = req.body;

            if (typeof id === 'number') {
                const equip = await prisma.equipment.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        req: true,
                        stats: true,
                    },
                });

                res.json(transformItem(equip));
            } else {
                const equips = await prisma.equipment.findMany({
                    where: {
                        id: { in: id },
                    },
                    include: {
                        req: true,
                        stats: true,
                    },
                    orderBy: {
                        id: 'asc',
                    },
                });

                res.json(equips.map(equip => transformItem(equip)));
            }

            break;
        }
    }
}

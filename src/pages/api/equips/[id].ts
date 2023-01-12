import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@services/prisma';

export default async function handler(req: NextApiRequest<Body>, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case 'GET': {
            const { id } = req.query;

            const equip = await prisma.equipment.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    req: true,
                    stats: true,
                },
            });

            res.json(equip);
            break;
		}
    }
}

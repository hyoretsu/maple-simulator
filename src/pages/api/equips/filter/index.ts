import transformItem from 'data/utils/transformItem';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@services/prisma';

interface Body {
    job: string;
    type?: string;
}

export default async function handler(req: NextApiRequest<Body>, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case 'POST': {
            let { job, type } = req.body;

            if (job === 'Beginner') job = '';

            const equips = await prisma.equipment.findMany({
                where: {
                    type,
                    req: {
                        OR: [
                            {
                                job: { equals: job },
                            },
                            {
                                job: { equals: '' },
                            },
                        ],
                    },
                },
                include: {
                    req: true,
                    stats: true,
                },
            });

            res.json(equips.map(equip => transformItem(equip)));
            break;
        }
    }
}

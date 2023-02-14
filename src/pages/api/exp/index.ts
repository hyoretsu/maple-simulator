import { JsonFixBigInt } from '@hyoretsu/shared.utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@services/prisma';

interface Body {
    exp: number[];
}

export default async function handler(req: NextApiRequest<Body>, res: NextApiResponse): Promise<void> {
    switch (req.method) {
        case 'GET': {
            const exp = await prisma.experience.findMany({
                orderBy: { level: 'asc' },
            });

            res.json(JsonFixBigInt(exp));
            break;
        }
        case 'POST':
            await prisma.experience.createMany({
                data: req.body.exp.map((exp, index) => ({
                    exp,
                    level: index + 1,
                })),
                skipDuplicates: true,
            });

            res.json({});
            break;
    }
}

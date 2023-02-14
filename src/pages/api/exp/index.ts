import { JsonFixBigInt } from '@hyoretsu/shared.utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { prisma } from '@services/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const schema = yup.object({
        exp: yup.array().of(yup.number().required()).required(),
    });

    switch (req.method) {
        case 'GET': {
            const exp = await prisma.experience.findMany({
                orderBy: { level: 'asc' },
            });

            res.json(JsonFixBigInt(exp));
            break;
        }
        case 'POST': {
            const body = await schema.validate(req.body);

            await prisma.experience.createMany({
                data: body.exp.map((exp, index) => ({
                    exp,
                    level: index + 1,
                })),
                skipDuplicates: true,
            });

            res.json({});
            break;
        }
    }
}

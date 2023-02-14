import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { prisma } from '@services/prisma';
import transformItem from '@utils/transformItem';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const schema = yup.object({
        id: yup
            .mixed<number | number[]>()
            .when({
                is: Array.isArray,
                then: yup.array().of(yup.number()),
                otherwise: yup.number(),
            })
            .required(),
    });

    switch (req.method) {
        case 'POST': {
            const { id } = await schema.validate(req.body);

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

import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { prisma } from '@services/prisma';
import transformItem from '@utils/transformItem';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const schema = yup.object({
        job: yup.string().required(),
        type: yup.string(),
    });

    switch (req.method) {
        case 'POST': {
            let { job, type } = await schema.validate(req.body);

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

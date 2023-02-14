import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import * as yup from 'yup';

import upload from '@services/multer';
import { prisma } from '@services/prisma';
import transformItem from '@utils/transformItem';

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const schema = yup.object({
        attackSpeed: yup.string().required(),
        category: yup.string().required(),
        enhancements: yup.string().required(),
        iconHeight: yup.string().required(),
        iconWidth: yup.string().required(),
        id: yup.string().required(),
        name: yup.string().required(),
        req: yup.string().required(),
        stats: yup.string().required(),
        type: yup.string().required(),
    });

    switch (req.method) {
        case 'GET': {
            const equips = await prisma.equipment.findMany({
                include: {
                    req: true,
                    stats: true,
                },
                orderBy: {
                    id: 'asc',
                },
            });

            res.json(equips.map(equip => transformItem(equip)));
            break;
        }
        case 'POST': {
            const middleware = upload.single('icon');

            // @ts-ignore
            middleware(req, res, async () => {
                const {
                    attackSpeed,
                    enhancements,
                    iconHeight,
                    iconWidth,
                    id,
                    req: requirements,
                    stats,
                    ...rest
                } = await schema.validate(req.body);

                const equip = await prisma.equipment.create({
                    data: {
                        ...(attackSpeed && { attackSpeed: Number(attackSpeed) }),
                        enhancements: Number(enhancements),
                        icon: req.file.key,
                        iconHeight: Number(iconHeight),
                        iconWidth: Number(iconWidth),
                        id: Number(id),
                        req: { create: JSON.parse(requirements) },
                        stats: { create: JSON.parse(stats) },
                        ...rest,
                    },
                    include: {
                        req: true,
                        stats: true,
                    },
                });

                res.json(transformItem(equip));
            });

            break;
        }
    }
}

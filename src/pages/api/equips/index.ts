import transformItem from 'data/utils/transformItem';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';

import upload from '@services/multer';
import { prisma } from '@services/prisma';

interface Body {
    attackSpeed: string;
    category: string;
    enhancements: string;
    iconHeight: string;
    iconWidth: string;
    id: string;
    name: string;
    req: string;
    stats: string;
    type: string;
}

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest<Body>, res: NextApiResponse): Promise<void> {
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
                } = req.body;

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

import '@hyoretsu/shared.hooks';
import { Equipment } from '@prisma/client';

declare module '@hyoretsu/shared.hooks' {
    interface APIMapping {
        '/equips': Equipment[];
        '/equips/filter': Equipment[];
        '/equips/find': Equipment | Equipment[];
        '/exp': Array<{ level: number; exp: number }>;
    }
}

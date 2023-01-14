import { Equipment } from '@prisma/client';
import { AxiosInstance } from 'axios';
import useSWR from 'swr';

type APIMapping = {
    '/equips': Equipment[];
    '/equips/filter': Equipment[];
    '/equips/find': Equipment | Equipment[];
    '/exp': Array<{ level: number; exp: number }>;
};

function useFetch<Data extends keyof APIMapping, Error = any>(
    urlDeps: Data | [Data, any | any[]],
    api: AxiosInstance,
    body?: Record<string, any>,
) {
    const reqInfo = useSWR<APIMapping[Data], Error>(urlDeps, async path => {
        let res;

        if (typeof urlDeps !== 'string') {
            [path] = urlDeps;
        }

        if (body) {
            res = await api.post(path, body);
        } else {
            res = await api.get(path);
        }

        return res.data;
    });

    return reqInfo;
}

export { useFetch };

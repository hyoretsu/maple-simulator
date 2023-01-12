import useSWR from 'swr';
import { AxiosInstance } from 'axios';
import { Equipment } from '@prisma/client';

type APIMapping = {
    '/equips': Equipment[];
    '/equips/1172000': Equipment;
    '/exp': Array<{ level: number; exp: number }>;
};

function useFetch<Data extends keyof APIMapping, Error = any>(url: Data, api: AxiosInstance) {
    const reqInfo = useSWR<APIMapping[Data], Error>(url, async path => {
        const { data } = await api.get(path);

        return data;
    });

    return reqInfo;
}

export { useFetch };

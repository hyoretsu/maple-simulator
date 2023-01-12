import { NextApiRequest } from 'next';

declare module 'next' {
	// eslint-disable-next-line
    export interface NextApiRequest extends NextApiRequest {
        file: Express.MulterS3.File;
    }
}

import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

const upload = multer({
    storage: multerS3({
        bucket: 'maple-sim',
        s3: new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            },
            region: 'us-east-1',
        }),
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});

export default upload;

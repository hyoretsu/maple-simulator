import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

const handlers: Record<string, (file: MultipartFile) => Promise<void>> = {
	local: async ({ file, filename }) => {
		const uploadPath = `uploads/${filename}`;
		const writeSteam = createWriteStream(uploadPath);
		await pipeline(file, writeSteam);
	},
	s3: async (file) => {
		const s3 = new S3Client({
			credentials: {
				accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
			},
		});

		const { filename: Key, mimetype: ContentType } = file;

		await s3.send(
			new PutObjectCommand({
				Bucket: process.env.AWS_BUCKET,
				Key,
				Body: await file.toBuffer(),
				ContentType,
			}),
		);
	},
};

const File = createParamDecorator(async (_data: unknown, ctx: ExecutionContext) => {
	const req: FastifyRequest = ctx.switchToHttp().getRequest();

	const isMultipart = req.isMultipart();
	if (!isMultipart) {
		throw new BadRequestException("multipart/form-data expected.");
	}

	const file = await req.file();
	if (!file) {
		throw new BadRequestException("File expected");
	}

	const { fieldname, fields, filename } = file;
	const fieldValuesArray = Object.values(fields) as MultipartValue[];

	// Save file
	handlers[process.env.STORAGE_DRIVER as string](file);

	return {
		...fieldValuesArray.reduce((old, field) => {
			if (field.fieldname === fieldname) return old;

			let value: any;

			try {
				value = Number(field.value);
				value = JSON.parse(field.value as string);
			} catch {
				value = field.value;
			}

			return {
				...old,
				[field.fieldname]: value,
			};
		}, {}),
		[fieldname]: filename,
	};
});

export default File;

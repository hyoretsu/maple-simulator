import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { MultipartFile } from "@fastify/multipart";
import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { FastifyRequest } from "fastify";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";

type MultipartParams = {
	fields?: string[];
	validation?: any;
};

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

const Multipart = createParamDecorator(
	async ({ fields, validation }: MultipartParams, ctx: ExecutionContext) => {
		const localFields = [...(fields || [])];

		const req: FastifyRequest = ctx.switchToHttp().getRequest();

		const isMultipart = req.isMultipart();
		if (!isMultipart) {
			throw new BadRequestException("multipart/form-data expected.");
		}

		const body: Record<string, string> = {};
		const files: MultipartFile[] = [];
		const parts = req.parts();

		for await (const part of parts) {
			let value: any;

			if (part.type === "file") {
				if (localFields.length > 0) {
					const fieldIndex = localFields.indexOf(part.fieldname);
					if (fieldIndex === -1) {
						throw new BadRequestException(`The field "${part.fieldname}" isn't allowed.`);
					}
					localFields.splice(fieldIndex, 1);
				}

				// Send file to be uploaded later
				files.push(part);

				value = part.filename;
			} else {
				try {
					value = Number(part.value);
					value = JSON.parse(part.value as string);
				} catch {
					value = part.value;
				}
			}

			body[part.fieldname] = value;
			if (part.type === "file" && localFields.length === 0) {
				break;
			}
		}

		if (localFields.length !== 0) {
			throw new BadRequestException("There are missing file fields.");
		}

		if (validation) {
			const validationErrors = await validate(plainToInstance(validation, body));

			throw new BadRequestException(
				validationErrors.flatMap((error) => {
					return error.children?.length
						? error.children.flatMap((child) =>
								Object.values(child.constraints as Record<string, string>).map(
									(err) => `${error.property}.${err}`,
								),
						  )
						: Object.values(error.constraints as Record<string, string>);
				}),
			);
		}

		// Save all files
		files.forEach((file) => handlers[process.env.STORAGE_DRIVER as string](file));

		return body;
	},
);

export default Multipart;

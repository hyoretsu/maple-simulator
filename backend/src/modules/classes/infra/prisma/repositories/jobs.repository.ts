import { Injectable } from "@nestjs/common";
import { Job } from "@prisma/client";

import PrismaService from "@database/prisma.service";

import JobsRepository from "@modules/classes/repositories/jobs.repository";
import CreateJobDTO from "@modules/classes/dtos/CreateJob.dto";

@Injectable()
export default class PrismaJobsRepository implements JobsRepository {
	constructor(private prisma: PrismaService) {}

	public async create({
		class: _,
		classId,
		icon: file,
		iconHeight: height,
		iconWidth: width,
		...data
	}: CreateJobDTO): Promise<Job> {
		const job = await this.prisma.job.create({
			data: {
				...data,
				class: {
					connect: {
						id: classId,
					},
				},
				icon: {
					create: {
						file,
						height,
						width,
					},
				},
			},
		});

		return job;
	}
}

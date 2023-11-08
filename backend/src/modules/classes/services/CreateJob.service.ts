import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Job } from "@prisma/client";

import CreateJobDTO from "../dtos/CreateJob.dto";
import ClassesRepository from "../repositories/classes.repository";
import JobsRepository from "../repositories/jobs.repository";

@Injectable()
export default class CreateJob {
	constructor(private classesRepository: ClassesRepository, private jobsRepository: JobsRepository) {}

	public async execute({ class: givenClass, classId, ...data }: CreateJobDTO): Promise<Job> {
		if (givenClass) {
			const foundClass = await this.classesRepository.findByName(givenClass);
			if (!foundClass) {
				throw new HttpException("There is no class with the given name.", HttpStatus.NOT_FOUND);
			}

			if (!classId) {
				classId = foundClass.id;
			} else if (foundClass.id !== classId) {
				throw new HttpException(
					"You sent a class and ID, but they aren't from the same class. Which one did you actually mean to use?",
					HttpStatus.BAD_REQUEST,
				);
			}
		} else if (!classId) {
			throw new HttpException(
				"You need to send either the name or the ID of class to which this job belongs.",
				HttpStatus.BAD_REQUEST,
			);
		}

		const job = await this.jobsRepository.create({ ...data, classId });

		return job;
	}
}

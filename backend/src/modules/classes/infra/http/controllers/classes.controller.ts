import { Body, Controller, Post } from "@nestjs/common";
import { Class, Job } from "@prisma/client";

import CreateClassDTO from "@modules/classes/dtos/CreateClass.dto";
import CreateClass from "@modules/classes/services/CreateClass.service";
import CreateJob from "@modules/classes/services/CreateJob.service";
import CreateJobDTO from "@modules/classes/dtos/CreateJob.dto";
import Multipart from "@decorators/multipart.decorator";

@Controller("classes")
export default class ClassesController {
	constructor(private createClass: CreateClass, private createJob: CreateJob) {}

	@Post()
	async postClasses(@Body() body: CreateClassDTO): Promise<Class> {
		const newClass = await this.createClass.execute(body);

		return newClass;
	}

	@Post("jobs")
	async postJobs(
		@Multipart({
			fields: ["icon"],
			validation: CreateJobDTO,
		})
		body: CreateJobDTO,
	): Promise<Job> {
		const newJob = await this.createJob.execute(body);

		return newJob;
	}
}

import { Job } from "@prisma/client";

import CreateJobDTO from "../dtos/CreateJob.dto";

export default abstract class JobsRepository {
	abstract create(data: CreateJobDTO): Promise<Job>;
}

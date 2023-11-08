import { Class } from "@prisma/client";

import CreateClassDTO from "../dtos/CreateClass.dto";

export default abstract class ClassesRepository {
	abstract create(data: CreateClassDTO): Promise<Class>;
	abstract findByName(name: string): Promise<Class | null>;
}

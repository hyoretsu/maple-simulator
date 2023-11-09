import { CacheModule, CacheInterceptor } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { redisStore } from "cache-manager-redis-yet";
import type { RedisClientOptions } from "redis";

import ClassesModule from "@modules/classes/classes.module";
import EquipmentsModule from "@modules/equipments/equipments.module";
import ExperienceModule from "@modules/experience/experience.module";

@Module({
	imports: [
		CacheModule.registerAsync<RedisClientOptions>({
			useFactory: async () => ({
				store: await redisStore({
					ttl: 7 * 24 * 60 * 60 * 1000, // 1 week
					url: process.env.REDIS_URL,
				}),
			}),
		}),
		ConfigModule.forRoot({
			envFilePath: [
				".env.local",
				".env",
				...(process.env.NODE_ENV === "production"
					? [".env.production.local", ".env.prodution"]
					: [".env.development.local", ".env.development"]),
			],
		}),
		...[ClassesModule, EquipmentsModule, ExperienceModule],
	],
	providers: [
		...(process.env.RAILWAY_ENVIRONMENT === "production"
			? [
					{
						provide: APP_INTERCEPTOR,
						useClass: CacheInterceptor,
					},
			  ]
			: []),
	],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ParserModule } from './modules/parser'
import { JokeModule } from './modules/joke'

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: './data/jokes.sqlite',
			// enableWAL: true,
			synchronize: process.env.NODE_ENV === 'development',
			autoLoadEntities: true,
		}),
		ScheduleModule.forRoot(),
		ParserModule,
		JokeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

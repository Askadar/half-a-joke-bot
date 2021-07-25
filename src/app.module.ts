import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ParserModule } from './modules/parser'
import { JokeModule } from './modules/joke'
import { BotModule } from './modules/bot'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: './data/jokes.sqlite',
			enableWAL: true,
			synchronize: process.env.NODE_ENV === 'development',
			autoLoadEntities: true,
		}),
		ScheduleModule.forRoot(),
		ParserModule,
		JokeModule,
		BotModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

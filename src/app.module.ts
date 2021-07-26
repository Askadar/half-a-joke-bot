import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
// import { DiscordModule } from 'discord-nestjs'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ParserModule } from './modules/parser'
import { JokeModule } from './modules/joke'
import { BotModule } from './modules/bot'
import { CommandsModule } from './modules/commands'

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
		// DiscordModule.forRootAsync({
		// 	imports: [ConfigModule],
		// 	useFactory: (configService: ConfigService) => ({
		// 		token: configService.get('DISCORD_BOT_TOKEN'),
		// 		commandPrefix: configService.get('COMMAND_PREFIX', '.'),
		// 	}),
		// 	inject: [ConfigService],
		// }),
		ParserModule,
		JokeModule,
		BotModule,
		CommandsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

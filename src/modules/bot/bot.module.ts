import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DiscordModule } from 'discord-nestjs'
import { JokeModule } from '../joke'
import { BotGateway } from './bot.gateway'
import { BotService } from './bot.service'

@Module({
	imports: [
		ConfigModule,
		DiscordModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				token: configService.get('DISCORD_BOT_TOKEN'),
				commandPrefix: configService.get('COMMAND_PREFIX', '.'),
			}),
			inject: [ConfigService],
		}),
		JokeModule,
	],
	providers: [BotGateway, BotService],
	exports: [BotService],
})
export class BotModule {}

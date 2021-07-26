import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JokeModule } from '../joke'
import { BotService } from './bot.service'

@Module({
	imports: [ConfigModule, JokeModule],
	providers: [BotService],
	exports: [BotService],
})
export class BotModule {}

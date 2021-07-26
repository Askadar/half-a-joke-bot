import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
// import { DiscordModule } from 'discord-nestjs'
import { JokeModule } from '../joke'
import { CommandsService } from './commands.service'

@Module({
	imports: [ConfigModule, JokeModule],
	providers: [CommandsService],
	exports: [CommandsService],
})
export class CommandsModule {}

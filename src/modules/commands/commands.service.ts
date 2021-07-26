import { SlashCreator, GatewayServer } from 'slash-create'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from 'discord.js'
import { HalfJokeCommand } from './half-joke.command'
import { JokeService } from '../joke'

@Injectable()
export class CommandsService {
	constructor(private readonly config: ConfigService, private readonly jokeService: JokeService) {
		const creator = new SlashCreator({
			applicationID: this.config.get('DISCORD_APPLICATION_ID'),
			publicKey: this.config.get('DISCORD_PUBLIC_KEY'),
			token: this.config.get('DISCORD_BOT_TOKEN'),
		})

		const client = new Client()

		creator
			// @ts-ignore
			.withServer(new GatewayServer((handler) => client.ws.on('INTERACTION_CREATE', handler)))
			.registerCommands([new HalfJokeCommand(creator, jokeService)])
			.syncCommands()

		client.login(this.config.get('DISCORD_BOT_TOKEN'))
	}
}

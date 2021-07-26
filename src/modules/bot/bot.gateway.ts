import { Injectable, Logger } from '@nestjs/common'
import { DiscordClientProvider, OnCommand, Once } from 'discord-nestjs'
import { Message } from 'discord.js'
import { JokeService } from '../joke'

@Injectable()
export class BotGateway {
	// private readonly logger = new Logger('BotGateway')

	constructor(
		private readonly discordProvider: DiscordClientProvider,
		private readonly jokeService: JokeService,
	) {}

	@Once({ event: 'ready' })
	async onReady(): Promise<void> {
		// this.logger.log(`Logged in as ${this.discordProvider.getClient().user.tag}!`)
	}

	@OnCommand({ name: 'half-joke' })
	async onJokeCommand(message: Message): Promise<void> {
		const joke = await this.jokeService.getRandomJoke()

		await message.reply(`${joke.halfJoke}`)
	}
}

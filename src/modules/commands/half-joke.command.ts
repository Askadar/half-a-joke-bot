import { SlashCommand } from 'slash-create'
import { JokeService } from '../joke'

export class HalfJokeCommand extends SlashCommand {
	constructor(creator, private readonly jokeService: JokeService) {
		super(creator, {
			name: 'half-joke',
			description: 'Gives you half of a foke',
			// options: [			],
		})
	}

	async run() {
		return (await this.jokeService.getRandomJoke()).halfJoke
	}
}

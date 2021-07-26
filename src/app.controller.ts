import { Controller, Get, Redirect, Render } from '@nestjs/common'
import { AppService } from './app.service'
import { BotService } from './modules/bot'
import { JokeService } from './modules/joke'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly jokesService: JokeService,
		private readonly botService: BotService,
	) {}

	@Get()
	@Render('index')
	async getJokes() {
		const joke = await this.jokesService.getRandomJoke()
		const inviteUrl = this.botService.generateInviteLink()
		return { joke, inviteUrl }
	}

	@Get('load-jokes')
	@Redirect('/')
	loadJokes() {
		return this.appService.storeRemoteJokes()
	}

	@Get('invite-bot')
	@Redirect('/invite-bot', 302)
	generateInviteLink() {
		const url = this.botService.generateInviteLink()
		return { url }
	}

	@Get('health')
	getHello(): string {
		return 'no'
	}
}

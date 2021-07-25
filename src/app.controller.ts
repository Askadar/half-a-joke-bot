import { Controller, Get } from '@nestjs/common'
// import { Observable, reduce } from 'rxjs'
import { AppService } from './app.service'
import { JokeService } from './modules/joke'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly jokesService: JokeService,
	) {}

	@Get()
	getHello(): string {
		return 'no'
	}

	@Get('random-joke')
	async getJokes() {
		return (await this.jokesService.getRandomJoke()).halfJoke
	}

	@Get('load-jokes')
	loadJokes() {
		return this.appService.storeRemoteJokes()
	}
}

import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { JokeService } from './modules/joke'
import { ParserService } from './modules/parser'

@Injectable()
export class AppService {
	constructor(
		private readonly parserService: ParserService,
		private readonly jokesService: JokeService,
	) {}

	@Cron('* * 12 * * *')
	async storeRemoteJokes() {
		const $jokes = this.parserService.getJokes()

		await this.jokesService.saveJokes($jokes).toPromise()
	}
}

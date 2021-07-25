import { Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { filter, map, mergeMap, toArray } from 'rxjs/operators'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JokeObject } from './joke.definition'
import { Joke } from './joke.entity'

@Injectable()
export class JokeService {
	constructor(
		@InjectRepository(Joke)
		private readonly jokes: Repository<Joke>,
	) {}

	public async getRandomJoke(): Promise<Joke> {
		return (
			await this.jokes.query(
				`SELECT * FROM ${this.jokes.metadata.tableName} ORDER BY RANDOM() LIMIT 1`,
			)
		)[0]
	}

	public saveJokes($jokes: Observable<JokeObject>) {
		const $jokeEntities = $jokes.pipe(
			map((data) =>
				this.jokes.create({
					id: data.id,
					originJoke: data.joke,
					halfJoke: this.halfJoke(data.joke),
				}),
			),
			filter((joke) => !!joke.halfJoke),
			toArray(),
			mergeMap((jokes) => this.jokes.save(jokes)),
		)

		return $jokeEntities
	}

	halfJoke(joke: string): string {
		const [, text, , punctuation] = joke.match(/(.+?)(([.?])|([,])).+/) || []

		if (!text || text === joke) {
			return ''
		}

		const delimiter = punctuation ? `${punctuation}..` : '...'
		return text + delimiter
	}
}

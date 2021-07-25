import { JokeService } from './joke.service'

describe('JokeService', () => {
	let service: JokeService

	beforeEach(() => {
		service = new JokeService(null as any)
	})

	describe('halfJoke', () => {
		const samples = [
			[
				`I was going to learn how to juggle, but I didn't have the balls.`,
				`I was going to learn how to juggle...`,
			],
			[
				`So, I heard this pun about cows, but it’s kinda offensive so I won’t say it. I don’t want there to be any beef between us.`,
				`So, I heard this pun about cows...`,
			],
		]

		samples.map(([sample, expectation]) => {
			it('should half the joke', () => {
				expect(service.halfJoke(sample)).toBe(expectation)
			})
		})
	})
})

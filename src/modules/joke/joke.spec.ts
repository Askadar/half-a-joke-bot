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
		]

		samples.map(([sample, expectation]) => {
			it('should half the joke', () => {
				expect(service.halfJoke(sample)).toBe(expectation)
			})
		})
	})
})

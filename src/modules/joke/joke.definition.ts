export type JokeObject = {
	id: string
	joke: string
}

export type JokesResponse = {
	current_page: number
	limit: number
	next_page?: number
	previous_page?: number
	results: JokeObject[]
	search_term: string
	status: number
	total_jokes: number
	total_pages: number
}

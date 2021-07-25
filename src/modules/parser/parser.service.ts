import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { expand, mergeMap } from 'rxjs/operators'
import { EMPTY, Observable, of } from 'rxjs'
import { AxiosResponse } from 'axios'
import { JokesResponse } from '../joke'

@Injectable()
export class ParserService {
	constructor(private readonly http: HttpService) {}

	agent = 'Half-Jokes for Dads (ZN Development<dev@zarahia.com>)'
	apiRoout = 'https://icanhazdadjoke.com'

	getJokes() {
		const getPage = (page: number) =>
			this.http
				.get(`${this.apiRoout}/search`, {
					params: { page },
					headers: { accept: 'application/json' },
				})
				.pipe(
					mergeMap<AxiosResponse<JokesResponse>, Observable<JokesResponse>>((resp) =>
						of(resp.data),
					),
				)
		const $jokes = getPage(1).pipe(
			expand((data) => (data.next_page < data.total_pages ? getPage(data.next_page) : EMPTY)),
			mergeMap((data) => data.results),
		)

		return $jokes.pipe()
	}
}

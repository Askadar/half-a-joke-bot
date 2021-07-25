import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Joke, JokeScore } from './joke.entity'
import { JokeService } from './joke.service'

@Module({
	imports: [TypeOrmModule.forFeature([Joke, JokeScore])],
	controllers: [],
	providers: [JokeService],
	exports: [JokeService],
})
export class JokeModule {}

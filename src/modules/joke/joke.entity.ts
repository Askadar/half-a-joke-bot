import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Joke {
	@PrimaryColumn()
	id: string

	@Column()
	originJoke: string

	@Column()
	halfJoke: string

	@Column({ default: 0 })
	score: number
}

@Entity()
export class JokeScore {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => Joke)
	jokeId: string

	@Column()
	change: number
}

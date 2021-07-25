import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class BotService {
	constructor(private readonly config: ConfigService) {}

	public generateInviteLink() {
		const permissions = 68608
		const scope = false ? `applications.commands%20bot` : null

		const clientId = this.config.get('DISCORD_BOT_CLIENT_ID')
		const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=${permissions}${
			scope ? `&scope=${scope}` : ''
		}`

		return url
	}
}

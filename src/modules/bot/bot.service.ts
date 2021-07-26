import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { URL } from 'url'

@Injectable()
export class BotService {
	constructor(private readonly config: ConfigService) {}

	public generateInviteLink() {
		const permissions = false ? 68608 : null
		const scope = true ? ['applications.commands'].join('%20') : null

		const url = new URL('https://discord.com/api/oauth2/authorize')
		const client_id = this.config.get('DISCORD_APPLICATION_ID')
		const params = { permissions, scope, client_id }
		const activeParamsTuple = Object.entries(params).filter(([, value]) => !!value)
		activeParamsTuple.forEach(([key, value]) => url.searchParams.append(key, value))

		return url.toString()
	}
}

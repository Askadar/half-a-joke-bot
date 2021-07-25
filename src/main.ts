import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useStaticAssets(join(__dirname, '..', 'public'))
	app.setBaseViewsDir(join(__dirname, '..', 'views'))
	app.setViewEngine('squirrelly')

	await app.listen(process.env.NODE_PORT || 3000)
}

bootstrap()

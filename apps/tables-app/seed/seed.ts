import { NestFactory } from '@nestjs/core';
import { SeedModule} from './seed.module';
import { SeedService } from './seed.service';
import { AppModule } from '../src/tables-app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);
  
  await seedService.run();
  await app.close();
}

bootstrap()
  .then(() => {
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });

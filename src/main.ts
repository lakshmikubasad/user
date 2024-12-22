import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * The entry point of the NestJS application.
 * 
 * The `bootstrap` function is responsible for initializing and starting the NestJS server.
 * It creates an application instance using the `AppModule` (the root module of the application) and
 * begins listening for incoming HTTP requests on the specified port.
 */
async function bootstrap() {
  /**
   * Creates an instance of the NestJS application using the `AppModule`.
   * 
   * `NestFactory.create(AppModule)` initializes the application and sets up the framework
   * with the necessary configurations provided in `AppModule`. This includes setting up
   * the database connection, importing other modules, and registering providers.
   * 
   * @returns {Promise<INestApplication>} - The application instance.
   */
  const app = await NestFactory.create(AppModule);

  /**
   * Starts the HTTP server and begins listening for incoming requests.
   * 
   * The application will listen on the port provided by the environment variable `PORT`.
   * If no value is set for `PORT`, it will default to port 3000.
   * 
   * @param {number} process.env.PORT - The port on which the application will run. 
   * If this environment variable is not set, it defaults to port 3000.
   */
  await app.listen(process.env.PORT ?? 3000);
}

/**
 * Calls the `bootstrap` function to launch the application when the script is executed.
 */
bootstrap();

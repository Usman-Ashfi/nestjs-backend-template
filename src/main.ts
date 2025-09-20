// src/main.ts

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common"; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? -------------- Global interceptors and filters---------------------------//
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,   //! Automatically remove properties that are not in the DTO
      forbidNonWhitelisted: true, //! Throw an error if non-whitelisted properties are provided
      transform: true, //! Automatically transform payloads to be objects typed according to their DTO classes
    })
  );


  //* -------------------------Swagger setup-----------------------------//
  const config = new DocumentBuilder()
    .setTitle("Backend API")
    .setDescription("Auto-generated API docs")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

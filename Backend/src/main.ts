import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
        origin: [
            "http://localhost:8081", 
            "http://0.0.0.0:8081",
            "http://localhost:3000",
            "http://192.168.1.55:3000",  // ← TU IP
            "exp://192.168.1.55:19000", // ← Para Expo
            "*"  // ← TEMPORAL: permite todo
        ],
        methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
        credentials: true
    });
    
    app.setGlobalPrefix("api/dsm43");
    
    await app.listen(3000);
    console.log('=====================================');
    console.log('🚀 Backend LISTO:');
    console.log('📍 http://localhost:3000/api/dsm43');
    console.log('📍 http://192.168.1.55:3000/api/dsm43');
    console.log('=====================================');
}
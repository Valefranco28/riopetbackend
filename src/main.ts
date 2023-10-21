import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Import firebase-admin
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

async function bootstrap() {
  
  dotenv.config();

   // Set the config options
  const adminConfig = {
    projectId: 'riopet',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCraLZ82KiCFH9B\neMInshCmH5q03cI4bNJ9bFiuxV5O+zyndGwz59aAuFWtBCfua6y0LBS8m6EEAS7A\nxMezAyY31686NwKfUaRM3uG0Ig+JT5VgGlrmDJX92OHu3tUiTw2KU9bWZDFqzVaV\n9nOLQw5MsyCkrhChJGFdQaUZkdkkJyyjXEm8/+jwVM1raYWYId9JgpICTHZJZ0OW\naaUFc9IcPRLRwyJvpAqAdGlibhAnNzTG/I+exE8KRoFv+8IN+u25Me8qDnOdOIVq\nnt02/+/j6YczyLZ6ovGge7F0Pg0IGOdE4XqWu1AWyXXcBcv6+2rNoUtBtI5J0D0r\n1dBDZn9tAgMBAAECggEAApohm/zidzbArJEJJ/bhd5c1xUpHI42bDS8Rr+IimsvM\nu1dtTOySj2OahfiYS6p2jkl83qOmVJmn14oARykkgFhJcJQRb9qQsobPzhozprcX\nTGIlHc3DL3Po6TQiZhWqSjm1+xb4hJ28YhsatWRioMOGS/1ix+7YVdipOp1867oh\nsW+m3VHZWfYltgQvd3QTck0QPBlQjcS0/F/Wig4dJUlhR4JiXTtBMFCleU+jJrae\nu7xw+eaFOfuSkrum03VA0KUuchTbnZ2+M/0wF8cBQef0RumiHXYncebSBeutSxN3\nCjfII8dqW4RdyArFSHODEGN6E2CYX15/EmxRnQvBgQKBgQDToB7PH+0ApUXAc4yA\nLfHY+E5AKqfR1XvyvheoFMAJ8K5gkTRV2GQ3gZfz27PliWwrx9H2+Hmg5IPvOOy7\nQ+hBLM0G9vLPBSlKbzR9BPjjGVkzeO7pd2YgT5LHSOontwL6uNjueHx4vKWN1dUf\nUun9LmrmNLY/YFD6+w715fsqrQKBgQDPWc6+5hY6b4xtm5UvT809sQ/hZJmjMcBj\nLr6jJ4pfIax/kc7QfXUZbENUv8sKT+epExfYvgPit+hzmFDdUDus5rF8Fr6w7pqG\nS9hT5IzYcL7arVM/Og5MEj6SJ5CgcwE1vHHgNJF72py1dJXQp0ULv6I6tdP8FdGl\nBUxzOc3/wQKBgQDATXNRoeA6wvRkUlutKpLnJ5PryRcgnU75oPVcPibXoYbDp48Y\nJv/CVJfg95c8kKjkC7rnIplbs+uT2XV9IdMOToisuICh0D3aLr1Skc8chq9BD7aC\nHoaF++kUAFUO68XgUVKHOKNbD4mdHl+BDFYmRCTNtb6aToqn1rWci3S2LQKBgHMi\nJOBvFgygf9MkvrOklgwZUv4ORBkPuQnZnNUvUW/9XLEBH1s5LlpNeR2H2ZACSlnh\nVi5tY+7xu0rkWpJoyJn7BrYmUwAfnQHQ/2+lymcsQ21dLIpBDEtFHiU9ftr4wMU7\nu+eIiPfCrZ07/Sv8lSQu5j+/UtP4sY314Tth73aBAoGAVGCHoRQX1go3q4DHfvJ2\nYWyz6UDmOQTg9tI18W/4DdcaR6CxnvWnQ6jgGzTOdEjZPLA+MPk8Xu6cTgTeXkkf\nhpAxVRdYXj1sD5vnM3qi2//bnO4TW1OtuRRkDM8c+Fx9H9P22EaMQsSqYe9N6s59\nIc4MmC7l6hIduR+Rho1xkME=\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n'),
    clientEmail: 'firebase-adminsdk-rf7gp@riopet.iam.gserviceaccount.com',
  };

    admin.initializeApp({
      credential: admin.credential.cert(adminConfig ),
      databaseURL: 'https://riopet.firebaseio.com',
      storageBucket: 'gs://riopet.appspot.com',
    });
  

  const app = await NestFactory.create(AppModule);
   // Configura CORS
   app.enableCors({
    origin: 'https://riopet.web.app/', // Cambia esto a tu origen deseado
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

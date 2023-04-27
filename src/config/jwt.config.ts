import { ConfigService } from "@nestjs/config";

export const jwtConfig = (configService: ConfigService) => ({
    secret: configService.get('jwtSecret'),
    global: true,
    signOptions: { expiresIn: '60m' },
  })
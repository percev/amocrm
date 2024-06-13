import { Module } from '@nestjs/common'
import { LeadController } from './lead.controller'
import { LeadService } from './lead.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [LeadController],
  providers: [LeadService]
})
export class LeadModule {}

import { Controller, Get, Query } from '@nestjs/common'
import { LeadService } from './lead.service'

@Controller('lead')
export class LeadController {
  constructor(private readonly service: LeadService) {}

  @Get()
  async list(@Query('query') query: string) {
    return this.service.getFilteredLeads(query?.length >= 3 ? query : null)
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as process from 'process'

@Injectable()
export class LeadService {
  async fetchLeads() {
    try {
      const url = `${process.env.API_URL}/leads`
      const headers = new Headers({
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      })
      const response = await fetch(url, {
        method: 'GET',
        headers
      })

      console.log('status', response.status, response.statusText)

      if (response.status === HttpStatus.NO_CONTENT) return []

      const data = await response.json()

      console.log({ data })
      return data['_embedded']['leads']
    } catch (e) {
      console.error({ e })
      throw new HttpException('Ошибка запроса к api', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getFilteredLeads(filter: string | null) {
    const leads = await this.fetchLeads()
    return filter
      ? leads.filter((lead) => lead.name.trim().toLowerCase().includes(filter.toLowerCase()))
      : leads
  }
}

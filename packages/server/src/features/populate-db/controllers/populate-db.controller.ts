import { Controller, Delete, Post } from '@nestjs/common';
import { PopulateDbService } from '../services/populate-db.service';
import { DOMAIN_NAMES } from '../../../shared/enums/domain-names.enum';

@Controller(DOMAIN_NAMES.POPULATE_DB)
export class PopulateDbController {
  constructor(private readonly _populateDbService: PopulateDbService) {
  }

  @Post()
  async populateDatabase(): Promise<string> {
    return this._populateDbService.populateDatabase();
  }

  @Delete()
  async deleteDatabase(): Promise<string> {
    return this._populateDbService.deleteDatabase();
  }
}

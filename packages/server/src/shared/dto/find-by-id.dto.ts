import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsMongoId, IsString } from 'class-validator';

export class FindByIdDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  id: string;
}

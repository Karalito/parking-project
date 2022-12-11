import { IsBoolean, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateTableDto {
  @ApiModelProperty()
  @IsNumber()
  readonly tableNumber: number;

  @ApiModelProperty()
  @IsBoolean()
  readonly isErgonomic: boolean;
}

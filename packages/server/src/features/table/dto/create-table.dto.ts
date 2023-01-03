import { IsBoolean, IsNumber, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateTableDto {
  @ApiModelProperty()
  @IsNumber()
  @Min(1)
  readonly tableNumber: number;

  @ApiModelProperty()
  @IsBoolean()
  readonly isErgonomic: boolean;
}

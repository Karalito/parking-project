import { IsBoolean, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateTableDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly roomId: string;

  @ApiModelProperty()
  @IsNumber()
  readonly tableNumber: number;

  @ApiModelProperty()
  @IsBoolean()
  readonly isErgonomic: boolean;
}

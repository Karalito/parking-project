import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsString } from 'class-validator';

export class CreateHardwareDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string

  @ApiModelProperty()
  @IsString()
  readonly size: string
}

import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsMongoId, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomSpaceDto {
  @ApiModelProperty()
  @IsNumber()
  @Min(1)
  roomNumber: number;

  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly tableId: string;
}

import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateRoomSpaceDto {
  @ApiModelProperty()
  @IsNumber()
  roomNumber: number;

  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly tableId: string;
}

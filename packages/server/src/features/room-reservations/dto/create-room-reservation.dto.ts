import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsMongoId, IsString } from 'class-validator';

export class CreateRoomReservationDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly userId: string;

  @ApiModelProperty()
  @IsString()
  readonly roomId: string;

  @ApiModelProperty()
  @IsString()
  readonly tableId: string;

  @IsString()
  readonly date: Date;
}

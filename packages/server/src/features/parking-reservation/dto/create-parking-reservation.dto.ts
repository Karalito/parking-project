import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsMongoId, IsString } from 'class-validator';

export class CreateParkingReservationDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly userId: string;

  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly parkingPlaceId: string;

  @ApiModelProperty()
  @IsString()
  readonly date: Date;
}

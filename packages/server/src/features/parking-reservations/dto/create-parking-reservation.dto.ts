import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsMongoId, IsString } from 'class-validator';

export class CreateParkingReservationDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly userId: string;

  @ApiModelProperty()
  @IsString()
  readonly parkingPlaceId: string;

  @ApiModelProperty()
  @IsString()
  @IsDateString()
  readonly date: Date;
}

import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber } from 'class-validator';

export class CreateParkingSpaceDto{
  @ApiModelProperty()
  @IsNumber()
  parkingPlaceNumber: number;
}
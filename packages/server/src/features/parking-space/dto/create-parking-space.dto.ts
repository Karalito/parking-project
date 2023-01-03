import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber, Min } from 'class-validator';

export class CreateParkingSpaceDto{
  @ApiModelProperty()
  @IsNumber()
  @Min(1)
  parkingPlaceNumber: number;
}
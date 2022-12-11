import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateRoomReservationDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly userId: string;

  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly roomId: string;

  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  @IsOptional()
  readonly hardwareId: string;

  @ApiModelProperty()
  @IsString()
  readonly date: Date;
}

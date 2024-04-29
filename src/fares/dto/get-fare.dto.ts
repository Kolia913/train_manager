import { IsNumber, IsString } from 'class-validator';
import { Fare } from '../entities/fare.entity';

export class GetFareDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  discount: number;

  static fromEntityArray(entities: Fare[]): GetFareDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  static fromEntity(entity: Fare): GetFareDto {
    return {
      id: entity.id,
      title: entity.title,
      discount: entity.discount,
    };
  }
}

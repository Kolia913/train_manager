import { Wagon } from '../entities/wagon.entity';

export class PublicWagonDto {
  id: number;

  number: string;

  type: string;

  static fromEntity(entity: Wagon): PublicWagonDto {
    return {
      id: entity.id,
      number: entity.number,
      type: entity.type,
    };
  }
}

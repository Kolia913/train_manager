import { Seat } from '../entities/seat.entity';

export class GetSeatDto {
  id: number;

  number: string;

  type: string;

  static fromEntity(entity: Seat): GetSeatDto {
    return {
      id: entity.id,
      number: entity.number,
      type: entity.type,
    };
  }
}

import { Train } from '../entities/train.entity';

export class GetTrainDto {
  id: number;

  number: string;

  type: string;

  class: string;

  static fromEntity(entity: Train): GetTrainDto {
    return {
      id: entity.id,
      number: entity.number,
      type: entity.type,
      class: entity.class,
    };
  }
}

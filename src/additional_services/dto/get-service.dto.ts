import { AdditionalService } from '../entities/additional_service.entity';

export class GetServiceDto {
  id: number;
  name: string;
  price: number;

  static fromEntityArray(entities: AdditionalService[]): GetServiceDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }

  static fromEntity(entity: AdditionalService): GetServiceDto {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
    };
  }
}

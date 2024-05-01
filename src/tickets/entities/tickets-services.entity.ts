import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Ticket } from './ticket.entity';
import { AdditionalService } from '../../additional_services/entities/additional_service.entity';

@Entity()
export class TicketsServices {
  @PrimaryColumn('int')
  ticketId: number;

  @ManyToOne(() => Ticket, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;

  @PrimaryColumn('int')
  additionalServiceId: number;

  @ManyToOne(() => AdditionalService, {
    onDelete: 'CASCADE',
  })
  additionalService: AdditionalService;

  @Column('float')
  priceWithDiscount: number;

  @Column('timestamptz')
  saleTimestamp: string;
}

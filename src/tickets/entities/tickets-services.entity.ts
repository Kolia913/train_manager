import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Ticket } from './ticket.entity';
import { AdditionalService } from '../../additional_services/entities/additional_service.entity';

@Entity()
export class TicketsServices {
  @ManyToOne(() => Ticket, (ticket: Ticket) => ticket.services, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;

  @PrimaryColumn('int')
  ticketId: number;

  @ManyToOne(() => AdditionalService, {
    onDelete: 'CASCADE',
  })
  additionalService: AdditionalService;

  @PrimaryColumn('int')
  additionalServiceId: number;

  @Column('float')
  priceWithDiscount: number;

  @Column('timestamptz')
  saleTimestamp: number;
}

export class CreateSeatsDto {
  wagon: { id: number };
  number: string;
  type: string;

  static createForWagon(wagonId: number, count: number): CreateSeatsDto[] {
    const seats: CreateSeatsDto[] = [];
    for (let i = 1; i <= count; i++) {
      if (i % 2 === 0) {
        seats.push({
          wagon: {
            id: wagonId,
          },
          number: i.toString(),
          type: 'Window',
        });
      } else {
        seats.push({
          wagon: {
            id: wagonId,
          },
          number: i.toString(),
          type: 'Aisle',
        });
      }
    }

    return seats;
  }
}

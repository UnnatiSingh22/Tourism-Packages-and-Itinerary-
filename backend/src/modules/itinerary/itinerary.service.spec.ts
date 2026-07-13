import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryService } from './itinerary.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('ItineraryService - DAG validation', () => {
  let service: ItineraryService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      itineraryDay: {
        findFirst: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItineraryService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ItineraryService>(ItineraryService);
  });

  it('should throw exception if checkout date is before checkin date', async () => {
    const mockDay = {
      id: 'day-1',
      hotelCheckIn: new Date('2026-07-02T14:00:00Z'),
      hotelCheckOut: new Date('2026-07-01T11:00:00Z'), // prior to checkin
      activities: [],
    };
    prismaMock.itineraryDay.findFirst.mockResolvedValue(mockDay);

    await expect(
      service.validateItineraryDay('tenant-1', 'day-1'),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw exception if supplier resource double booking is detected', async () => {
    const mockDay = {
      id: 'day-1',
      hotelCheckIn: null,
      hotelCheckOut: null,
      activities: [
        {
          id: 'act-1',
          title: 'Morning Tour',
          startTime: new Date('2026-07-01T09:00:00Z'),
          endTime: new Date('2026-07-01T12:00:00Z'),
          supplierId: 'guide-1',
        },
        {
          id: 'act-2',
          title: 'Lunch Meetup',
          startTime: new Date('2026-07-01T11:00:00Z'), // overlaps with Morning Tour
          endTime: new Date('2026-07-01T13:00:00Z'),
          supplierId: 'guide-1', // same guide supplier
        },
      ],
    };
    prismaMock.itineraryDay.findFirst.mockResolvedValue(mockDay);

    await expect(
      service.validateItineraryDay('tenant-1', 'day-1'),
    ).rejects.toThrow(BadRequestException);
  });
});

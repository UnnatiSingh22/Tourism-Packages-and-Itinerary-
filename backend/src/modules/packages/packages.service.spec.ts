import { Test, TestingModule } from '@nestjs/testing';
import { PackagesService } from './packages.service';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';

describe('PackagesService - Pricing Engine', () => {
  let service: PackagesService;
  let prismaMock: any;
  let redisMock: any;

  beforeEach(async () => {
    prismaMock = {
      tourPackage: {
        findFirst: jest.fn(),
      },
    };

    redisMock = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackagesService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: RedisService, useValue: redisMock },
      ],
    }).compile();

    service = module.get<PackagesService>(PackagesService);
  });

  it('should calculate package pricing correctly for adults, children, and infants', async () => {
    // Mock package metadata
    const mockPackage = {
      id: 'pkg-1',
      basePrice: 1000.0,
      pricing: {
        marginPerPax: 200.0,
        seasonalAdjustment: 50.0,
        addOnsTotal: 100.0,
      },
    };
    prismaMock.tourPackage.findFirst.mockResolvedValue(mockPackage);

    // Calculate with: 2 adults, 1 child, 1 infant, $50 custom add-ons
    const result = await service.calculatePricing('tenant-1', 'pkg-1', {
      paxCount: 2,
      childCount: 1,
      infantCount: 1,
      addOnsTotal: 50.0,
    });

    // Calculations details:
    // Adult Unit Price = 1000 (Base) + 200 (Margin) + 50 (Seasonal) = 1250
    // Adults Total = 2 * 1250 = 2500
    // Child Unit Price = 1250 * 0.75 = 937.5
    // Children Total = 1 * 937.5 = 937.5
    // Infant Unit Price = 1250 * 0.10 = 125
    // Infant Total = 1 * 125 = 125
    // Add-Ons Total = 100 (Base) + 50 (Custom) = 150
    // Grand Total = 2500 + 937.5 + 125 + 150 = 3712.5

    expect(result.adultUnitPrice).toBe(1250);
    expect(result.adultTotal).toBe(2500);
    expect(result.childUnitPrice).toBe(937.5);
    expect(result.childTotal).toBe(937.5);
    expect(result.infantUnitPrice).toBe(125);
    expect(result.infantTotal).toBe(125);
    expect(result.totalAddOns).toBe(150);
    expect(result.grandTotal).toBe(3712.5);
  });
});

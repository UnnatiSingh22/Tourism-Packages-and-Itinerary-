import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Tenant
  const tenant = await prisma.tenant.upsert({
    where: { id: 'default-tenant-uuid' },
    update: {},
    create: {
      id: 'default-tenant-uuid',
      name: 'EventHub360 Corporate Tenant',
    },
  });
  console.log(`Tenant created: ${tenant.name}`);

  // 2. Create Users (hashed passwords)
  const passwordHash = await bcrypt.hash('password123', 10);

  const usersData = [
    {
      email: 'manager@eventhub360.com',
      password: passwordHash,
      role: 'tour_manager',
    },
    {
      email: 'ticketing@eventhub360.com',
      password: passwordHash,
      role: 'ticketing_exec',
    },
    {
      email: 'finance@eventhub360.com',
      password: passwordHash,
      role: 'finance_mgr',
    },
  ];

  for (const userData of usersData) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: { role: userData.role },
      create: {
        email: userData.email,
        password: userData.password,
        role: userData.role,
        tenantId: tenant.id,
      },
    });
  }
  console.log('Seeded standard users (manager@eventhub360.com, ticketing@eventhub360.com, finance@eventhub360.com). Password: password123');

  // 3. Create Suppliers & active Contracts
  const supplier1 = await prisma.supplier.create({
    data: {
      tenantId: tenant.id,
      name: 'Luxury Transport Services Ltd',
      email: 'ops@luxurytransport.local',
      phone: '+15550199',
      status: 'ACTIVE',
    },
  });

  const contract1 = await prisma.supplierContract.create({
    data: {
      tenantId: tenant.id,
      supplierId: supplier1.id,
      contractNumber: 'CON-2026-001',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2028-12-31'),
      status: 'ACTIVE',
      terms: 'Transport allocations at $200 per vehicle per day.',
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      tenantId: tenant.id,
      name: 'Grand Hotel Europe',
      email: 'booking@grandhoteleurope.local',
      phone: '+15550200',
      status: 'ACTIVE',
    },
  });

  const contract2 = await prisma.supplierContract.create({
    data: {
      tenantId: tenant.id,
      supplierId: supplier2.id,
      contractNumber: 'CON-2026-002',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2028-12-31'),
      status: 'ACTIVE',
      terms: 'Rooms at $150 per night fixed rate.',
    },
  });

  console.log('Seeded suppliers and contracts');

  // 4. Create Tour Packages
  // Package A (Draft)
  const draftPackage = await prisma.tourPackage.create({
    data: {
      tenantId: tenant.id,
      code: 'PKG-AMALFI',
      name: 'Amalfi Coast Luxury Getaway',
      description: 'Experience 5 days of absolute bliss along the cliffs of Amalfi.',
      category: 'Luxury Elite',
      duration: 5,
      basePrice: 2500.0,
      status: 'DRAFT',
    },
  });

  await prisma.packagePricing.create({
    data: {
      tenantId: tenant.id,
      packageId: draftPackage.id,
      marginPerPax: 400.0,
      seasonalAdjustment: 150.0,
      addOnsTotal: 100.0,
    },
  });

  // Package B (Published)
  const pubPackage = await prisma.tourPackage.create({
    data: {
      tenantId: tenant.id,
      code: 'PKG-PARIS',
      name: 'Parisian Summer Romance',
      description: 'Spend 7 days touring the streets of Paris, climbing the Eiffel Tower, and tasting luxury cuisines.',
      category: 'Romantic Escapes',
      duration: 7,
      basePrice: 3200.0,
      status: 'PUBLISHED',
    },
  });

  await prisma.packagePricing.create({
    data: {
      tenantId: tenant.id,
      packageId: pubPackage.id,
      marginPerPax: 500.0,
      seasonalAdjustment: 200.0,
      addOnsTotal: 300.0,
    },
  });

  // Seed itinerary days for Published Package
  const day1 = await prisma.itineraryDay.create({
    data: {
      tenantId: tenant.id,
      packageId: pubPackage.id,
      dayNumber: 1,
      title: 'Arrival & Welcome Dinner',
      description: 'Land in Paris CDG airport. Transfer to Grand Hotel Europe.',
      accommodation: 'Grand Hotel Europe',
      hotelCheckIn: new Date('2026-07-01T14:00:00Z'),
      hotelCheckOut: new Date('2026-07-02T11:00:00Z'),
    },
  });

  const day2 = await prisma.itineraryDay.create({
    data: {
      tenantId: tenant.id,
      packageId: pubPackage.id,
      dayNumber: 2,
      title: 'Eiffel Tower Tour',
      description: 'Morning tour of Eiffel Tower. Afternoon cruise on the Seine River.',
      accommodation: 'Grand Hotel Europe',
    },
  });

  // Seed itinerary activities
  await prisma.itineraryActivity.create({
    data: {
      tenantId: tenant.id,
      dayId: day1.id,
      title: 'Welcome Dinner Banquet',
      description: 'Introduction dinner with group.',
      startTime: new Date('2026-07-01T19:00:00Z'),
      endTime: new Date('2026-07-01T21:00:00Z'),
      location: 'Hotel Banquet Hall',
      supplierId: supplier2.id,
    },
  });

  await prisma.itineraryActivity.create({
    data: {
      tenantId: tenant.id,
      dayId: day2.id,
      title: 'Morning Cruise Seine',
      description: 'Eiffel tower river cruise.',
      startTime: new Date('2026-07-02T09:00:00Z'),
      endTime: new Date('2026-07-02T11:00:00Z'),
      location: 'Seine Pier 4',
      supplierId: supplier1.id,
    },
  });

  console.log('Seeded packages & itinerary days');

  // 5. Create Departures
  const departure1 = await prisma.departure.create({
    data: {
      tenantId: tenant.id,
      packageId: pubPackage.id,
      name: 'Parisian Summer Tour - July 2026',
      startDate: new Date('2026-07-01T00:00:00Z'),
      endDate: new Date('2026-07-08T00:00:00Z'),
      capacity: 10,
      availableCapacity: 9, // starts with 1 booked traveler
      status: 'ACTIVE',
    },
  });

  // Create initial Booked Traveler
  const traveler = await prisma.traveler.create({
    data: {
      tenantId: tenant.id,
      departureId: departure1.id,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@smith.com',
      phone: '+15559090',
      passportNumber: 'US-PASS-12345',
      passportExpiry: new Date('2031-12-31T00:00:00Z'),
      nationality: 'US',
      complianceStatus: 'clear',
      status: 'BOOKED',
    },
  });

  // Create allocation
  await prisma.departureAllocation.create({
    data: {
      tenantId: tenant.id,
      departureId: departure1.id,
      supplierId: supplier1.id,
      contractId: contract1.id,
      resourceType: 'TRANSPORT',
      quantity: 2,
      status: 'CONFIRMED',
    },
  });

  // Create Cost Sheet item
  await prisma.costSheetItem.create({
    data: {
      tenantId: tenant.id,
      departureId: departure1.id,
      itemType: 'SUPPLIER_COST',
      description: 'Airport private transfer',
      amount: 400.0,
    },
  });

  console.log(`Departure created: ${departure1.name} with traveler Alice Smith`);
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

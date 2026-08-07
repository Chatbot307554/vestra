import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u001',
    email: 'emma.thompson@example.co.uk',
    firstName: 'Emma',
    lastName: 'Thompson',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    addresses: [
      { id: 'addr001', label: 'Home', firstName: 'Emma', lastName: 'Thompson', line1: '42 Notting Hill Gate', line2: 'Flat 3', city: 'London', county: 'Greater London', postcode: 'W11 3HX', country: 'United Kingdom', isDefault: true },
    ],
    measurementProfile: {
      id: 'mp001', userId: 'u001', height: 168, weight: 62, chest: 88, waist: 70, hips: 94, inseam: 76,
      ageRange: '25-34', bodyProfile: 'regular', preferredFit: 'regular', unitSystem: 'metric', lastUpdated: '2024-09-01T10:00:00Z',
    },
    wishlistIds: ['p003', 'p005', 'p009'],
    createdAt: '2024-01-15T10:00:00Z',
    isActive: true,
    marketingOptIn: true,
  },
  {
    id: 'u002',
    email: 'james.wilson@example.co.uk',
    firstName: 'James',
    lastName: 'Wilson',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    addresses: [
      { id: 'addr002', label: 'Home', firstName: 'James', lastName: 'Wilson', line1: '18 King Street', city: 'Manchester', county: 'Greater Manchester', postcode: 'M2 6AW', country: 'United Kingdom', isDefault: true },
    ],
    measurementProfile: {
      id: 'mp002', userId: 'u002', height: 182, weight: 78, chest: 100, waist: 82, inseam: 84,
      ageRange: '25-34', bodyProfile: 'athletic', preferredFit: 'regular', unitSystem: 'metric', lastUpdated: '2024-08-20T14:00:00Z',
    },
    wishlistIds: ['p015', 'p018'],
    createdAt: '2024-03-10T09:00:00Z',
    isActive: true,
    marketingOptIn: false,
  },
  {
    id: 'u003',
    email: 'sophie.clarke@example.co.uk',
    firstName: 'Sophie',
    lastName: 'Clarke',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    addresses: [
      { id: 'addr003', label: 'Home', firstName: 'Sophie', lastName: 'Clarke', line1: '7 George Street', city: 'Edinburgh', county: 'City of Edinburgh', postcode: 'EH2 2PA', country: 'United Kingdom', isDefault: true },
    ],
    measurementProfile: undefined,
    wishlistIds: ['p001', 'p004'],
    createdAt: '2024-05-22T11:00:00Z',
    isActive: true,
    marketingOptIn: true,
  },
  {
    id: 'u004',
    email: 'oliver.bennett@example.co.uk',
    firstName: 'Oliver',
    lastName: 'Bennett',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    addresses: [],
    measurementProfile: undefined,
    wishlistIds: [],
    createdAt: '2024-07-01T08:00:00Z',
    isActive: false,
    marketingOptIn: false,
  },
  {
    id: 'u005',
    email: 'admin@vestra.co.uk',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&q=80',
    addresses: [],
    measurementProfile: undefined,
    wishlistIds: [],
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
    marketingOptIn: false,
  },
  {
    id: 'u006',
    email: 'isabella.morris@example.co.uk',
    firstName: 'Isabella',
    lastName: 'Morris',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-ada5b5c66f12?w=200&q=80',
    addresses: [
      { id: 'addr006', label: 'Home', firstName: 'Isabella', lastName: 'Morris', line1: '23 Park Lane', city: 'Birmingham', county: 'West Midlands', postcode: 'B1 2LY', country: 'United Kingdom', isDefault: true },
    ],
    measurementProfile: {
      id: 'mp006', userId: 'u006', height: 165, weight: 55, chest: 82, waist: 64, hips: 88,
      ageRange: '18-24', bodyProfile: 'slim', preferredFit: 'fitted', unitSystem: 'metric', lastUpdated: '2024-09-10T16:00:00Z',
    },
    wishlistIds: ['p006', 'p010'],
    createdAt: '2024-06-15T12:00:00Z',
    isActive: true,
    marketingOptIn: true,
  },
];

export const demoCustomer = mockUsers[0];
export const demoAdmin = mockUsers[4];

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

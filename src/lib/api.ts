const API_BASE = 'http://localhost:3000/api';

// Cache for JWT token to avoid excessive login calls
let jwtToken: string | null = localStorage.getItem('eh_jwt_token');

/**
 * Automate login as manager@eventhub360.com to fetch a valid JWT token
 */
export async function getAuthToken(): Promise<string> {
  if (jwtToken) return jwtToken;

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'manager@eventhub360.com',
        password: 'password123',
      }),
    });

    if (!res.ok) {
      throw new Error(`Auth failed with status ${res.status}`);
    }

    const envelope = await res.json();
    jwtToken = envelope.data?.accessToken || envelope.accessToken || envelope.token;
    if (jwtToken) {
      localStorage.setItem('eh_jwt_token', jwtToken);
      return jwtToken;
    }
    throw new Error('Token missing in login response');
  } catch (error) {
    console.error('Failed to authenticate with backend:', error);
    throw error;
  }
}

/**
 * Core request helper that appends JWT token automatically and unpacks the success envelope
 */
async function request(path: string, options: RequestInit = {}): Promise<any> {
  const token = await getAuthToken().catch(() => null);
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Request to ${path} failed (${res.status}): ${body}`);
  }

  // Handle 204 No Content
  if (res.status === 204) return null;

  const envelope = await res.json();
  
  // Unpack NestJS response envelope if present
  return envelope && envelope.success && envelope.data !== undefined ? envelope.data : envelope;
}

// ==========================================
// Tour Packages API
// ==========================================
export async function getPackages() {
  return request('/tur/packages');
}

export async function getPackage(id: string) {
  return request(`/tur/packages/${id}`);
}

export async function createPackage(data: any) {
  return request('/tur/packages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updatePackage(id: string, data: any) {
  return request(`/tur/packages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function approvePackage(id: string) {
  return request(`/tur/packages/${id}/approve`, { method: 'POST' });
}

export async function getPricing(packageId: string) {
  return request(`/tur/packages/${packageId}/pricing`);
}

export async function updatePricing(packageId: string, data: any) {
  return request(`/tur/packages/${packageId}/pricing`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function calculatePricing(packageId: string, data: any) {
  return request(`/tur/packages/${packageId}/pricing/calculate`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==========================================
// Itinerary API
// ==========================================
export async function getItinerary(packageId: string) {
  return request(`/tur/packages/${packageId}/itinerary`);
}

export async function createItineraryDay(packageId: string, data: any) {
  return request(`/tur/packages/${packageId}/itinerary/days`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateItineraryDay(dayId: string, data: any) {
  return request(`/tur/itinerary/days/${dayId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteItineraryDay(dayId: string) {
  return request(`/tur/itinerary/days/${dayId}`, { method: 'DELETE' });
}

export async function reorderItinerary(packageId: string, dayIds: string[]) {
  return request(`/tur/packages/${packageId}/itinerary/reorder`, {
    method: 'POST',
    body: JSON.stringify({ dayIds }),
  });
}

export async function validateItineraryDay(dayId: string) {
  return request(`/tur/itinerary/days/${dayId}/validate`, { method: 'POST' });
}

export async function createItineraryActivity(dayId: string, data: any) {
  return request(`/tur/itinerary/days/${dayId}/activities`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==========================================
// Departures API
// ==========================================
export async function getDepartures() {
  return request('/tur/departures');
}

export async function createDeparture(data: any) {
  return request('/tur/departures', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateDeparture(id: string, data: any) {
  return request(`/tur/departures/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function updateDepartureInventory(id: string, data: { availableCapacity: number; totalCapacity?: number }) {
  return request(`/tur/departures/${id}/inventory`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function getDepartureWaitlist(departureId: string) {
  return request(`/tur/departures/${departureId}/waitlist`);
}

export async function promoteWaitlistMember(departureId: string, waitlistId: string) {
  return request(`/tur/departures/${departureId}/waitlist/${waitlistId}/promote`, {
    method: 'POST',
  });
}

// ==========================================
// Travelers API
// ==========================================
export async function getTravelers() {
  return request('/tur/travelers');
}

export async function createTraveler(data: any) {
  return request('/tur/travelers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function cancelTravelerBooking(travelerId: string) {
  return request(`/tur/travelers/${travelerId}/cancel`, { method: 'POST' });
}

export async function generateVoucher(travelerId: string) {
  return request(`/tur/travelers/${travelerId}/vouchers/generate`, { method: 'POST' });
}

// ==========================================
// Automation Rules API
// ==========================================
export async function getAutomationRules() {
  return request('/tur/automation/rules');
}

export async function createAutomationRule(data: any) {
  return request('/tur/automation/rules', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAutomationLogs() {
  return request('/tur/automation/logs');
}

// ==========================================
// Master Data Management API
// ==========================================
export async function getMasterRecords(category: string) {
  return request(`/masters/${category}`);
}

export async function createMasterRecord(category: string, data: any) {
  return request(`/masters/${category}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateMasterRecord(category: string, id: string, data: any) {
  return request(`/masters/${category}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteMasterRecord(category: string, id: string) {
  return request(`/masters/${category}/${id}`, {
    method: 'DELETE',
  });
}

export async function bulkDeleteMasterRecords(category: string, ids: string[]) {
  return request(`/masters/${category}/bulk-delete`, {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
}

export async function bulkUpdateMasterStatus(category: string, ids: string[], status: string) {
  return request(`/masters/${category}/bulk-status`, {
    method: 'POST',
    body: JSON.stringify({ ids, status }),
  });
}

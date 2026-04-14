export type ApiResponse<T> = { success: boolean; message: string; data: T; errors?: string[]; timestamp: string };
export type Page<T> = { content: T[]; page: number; size: number; totalElements: number; totalPages: number; last: boolean };

export type User = { id: number; firstName: string; lastName: string; email: string; phone?: string; roles: string[] };
export type AuthResp = { accessToken: string; tokenType: string; expiresIn: number; user: User };

export type Category = { id: number; name: string; slug: string; icon: string };
export type City = { id: number; name: string; country: string };
export type Venue = { id: number; name: string; address: string; capacity: number; cityId: number; cityName: string };

export type TicketType = { id: number; name: string; price: number; quota: number; sold: number; available: number };

export type EventDto = {
  id: number; title: string; slug: string; description: string;
  coverImageUrl: string; startsAt: string; endsAt?: string;
  status: string; featured: boolean;
  categoryName: string; categoryId: number;
  venueName: string; cityName: string; venueAddress: string;
  ticketTypes: TicketType[]; images: string[];
};

export type OrderItem = { id: number; ticketTypeId: number; ticketTypeName: string; eventTitle: string; quantity: number; unitPrice: number; subtotal: number };
export type Order = {
  id: number; orderNumber: string; status: string; pickupMethod: string;
  totalAmount: number; createdAt: string;
  items: OrderItem[]; paymentTransactionId?: string; invoiceNumber?: string;
};

export type Ticket = { id: number; code: string; status: string; eventTitle: string; venueName: string; startsAt: string; ticketTypeName: string; orderNumber: string };

export type Invoice = {
  id: number; invoiceNumber: string; orderNumber: string; issueDate: string; totalAmount: number;
  customerName: string; customerEmail: string; pickupMethod: string;
  items: OrderItem[]; notes?: string;
};

export type AdminStats = { totalUsers: number; totalOrders: number; soldTickets: number; totalRevenue: number; upcomingEvents: number };

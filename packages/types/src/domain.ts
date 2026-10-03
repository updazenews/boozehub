export const roles = ['CUSTOMER','STORE_OWNER','STORE_MANAGER','STORE_STAFF','DRIVER','SUPPORT_AGENT','ADMIN','SUPER_ADMIN'] as const;
export type Role = typeof roles[number];
export type OrderStatus = 'PENDING_PAYMENT'|'PAID'|'SENT_TO_STORE'|'STORE_ACCEPTED'|'PREPARING'|'READY_FOR_COLLECTION'|'DRIVER_ASSIGNED'|'DRIVER_ARRIVED_AT_STORE'|'PICKED_UP'|'EN_ROUTE'|'ARRIVED'|'AGE_VERIFICATION'|'DELIVERED'|'FAILED_DELIVERY'|'CANCELLED'|'REFUNDED';
export type VerificationStatus = 'PENDING'|'VERIFIED'|'FAILED'|'REVIEW_REQUIRED';
export interface Actor { id: string; role: Role; storeId?: string; }
export interface CartItem { productId: string; name: string; unitPriceCents: number; quantity: number; }
export interface Cart { id: string; customerId: string; storeId: string; items: CartItem[]; }
export interface OrderCompliance { customerAgeVerified: boolean; storeLicenceVerified: boolean; deliveryAgeCheckRequired: boolean; deliveryAgeCheckCompleted: boolean; deliveryAgeCheckResult?: VerificationStatus; status: 'PENDING'|'CLEARED'|'FAILED'|'REVIEW_REQUIRED'; }

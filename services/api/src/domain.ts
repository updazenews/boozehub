import type { Cart, CartItem, OrderCompliance, OrderStatus } from '../../../packages/types/src/domain.ts';

export class DomainError extends Error { readonly code: string; constructor(code: string, message: string) { super(message); this.code = code; } }
export interface Product { id:string; storeId:string; name:string; priceCents:number; active:boolean; stock:number; }
export interface Store { id:string; status:'PENDING'|'APPROVED'|'SUSPENDED'|'EXPIRED'; licenceVerified:boolean; licenceExpiry:string; }
export interface Order { id:string; customerId:string; storeId:string; status:OrderStatus; subtotalCents:number; totalCents:number; compliance:OrderCompliance; }
const transitions: Record<OrderStatus, OrderStatus[]> = {
 PENDING_PAYMENT:['PAID','CANCELLED'], PAID:['SENT_TO_STORE','CANCELLED','REFUNDED'], SENT_TO_STORE:['STORE_ACCEPTED','CANCELLED','REFUNDED'], STORE_ACCEPTED:['PREPARING','CANCELLED'], PREPARING:['READY_FOR_COLLECTION','CANCELLED'], READY_FOR_COLLECTION:['DRIVER_ASSIGNED'], DRIVER_ASSIGNED:['DRIVER_ARRIVED_AT_STORE','CANCELLED'], DRIVER_ARRIVED_AT_STORE:['PICKED_UP'], PICKED_UP:['EN_ROUTE'], EN_ROUTE:['ARRIVED'], ARRIVED:['AGE_VERIFICATION'], AGE_VERIFICATION:['DELIVERED','FAILED_DELIVERY'], DELIVERED:[], FAILED_DELIVERY:['REFUNDED'], CANCELLED:['REFUNDED'], REFUNDED:[]
};
export function isStoreEligible(store: Store, today = new Date()): boolean { return store.status === 'APPROVED' && store.licenceVerified && new Date(store.licenceExpiry) >= today; }
export function addToSingleStoreCart(cart: Cart | undefined, customerId:string, product:Product, quantity:number, resolution?:'REPLACE_CART'|'KEEP_CURRENT_CART'): Cart {
 if (!product.active || product.stock < quantity) throw new DomainError('PRODUCT_UNAVAILABLE','This product is unavailable.');
 if (cart && cart.storeId !== product.storeId) { if (resolution !== 'REPLACE_CART') throw new DomainError('CART_STORE_CONFLICT','This product is sold by another store. Your cart can only contain products from one store at a time.'); cart = undefined; }
 const result = cart ?? {id:crypto.randomUUID(),customerId,storeId:product.storeId,items:[]};
 const present = result.items.find(i=>i.productId===product.id);
 if (present) present.quantity += quantity; else result.items.push({productId:product.id,name:product.name,unitPriceCents:product.priceCents,quantity});
 return result;
}
export function createOrder(cart:Cart, store:Store, ageVerified:boolean, deliveryFeeCents:number, platformFeeCents:number):Order {
 if (!ageVerified) throw new DomainError('AGE_VERIFICATION_REQUIRED','Age verification is required before placing an alcohol order.');
 if (!isStoreEligible(store)) throw new DomainError('STORE_INELIGIBLE','This store cannot receive new orders.');
 if (!cart.items.length) throw new DomainError('EMPTY_CART','Your cart is empty.');
 const subtotalCents=cart.items.reduce((sum,item)=>sum+item.unitPriceCents*item.quantity,0);
 return {id:crypto.randomUUID(),customerId:cart.customerId,storeId:cart.storeId,status:'PENDING_PAYMENT',subtotalCents,totalCents:subtotalCents+deliveryFeeCents+platformFeeCents,compliance:{customerAgeVerified:true,storeLicenceVerified:true,deliveryAgeCheckRequired:true,deliveryAgeCheckCompleted:false,status:'CLEARED'}};
}
export function transitionOrder(order:Order, next:OrderStatus):Order { if (!transitions[order.status].includes(next)) throw new DomainError('INVALID_ORDER_TRANSITION',`Cannot move an order from ${order.status} to ${next}.`); if(next==='DELIVERED' && (!order.compliance.deliveryAgeCheckCompleted || order.compliance.deliveryAgeCheckResult!=='VERIFIED')) throw new DomainError('DELIVERY_AGE_VERIFICATION_REQUIRED','Age verification must pass before delivery can be completed.'); return {...order,status:next}; }
export function recordDeliveryAgeCheck(order:Order, result:'VERIFIED'|'FAILED'):Order { if(order.status!=='AGE_VERIFICATION') throw new DomainError('INVALID_DELIVERY_STAGE','Age verification is only available after arrival.'); return {...order,compliance:{...order.compliance,deliveryAgeCheckCompleted:true,deliveryAgeCheckResult:result,status:result==='VERIFIED'?'CLEARED':'FAILED'}}; }

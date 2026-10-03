import { z } from 'zod';
export const addCartItemSchema = z.object({productId:z.string().uuid(), quantity:z.number().int().positive(), conflictResolution:z.enum(['REPLACE_CART','KEEP_CURRENT_CART']).optional()});
export const createOrderSchema = z.object({addressId:z.string().uuid()});
export const ageVerificationSchema = z.object({result:z.enum(['VERIFIED','FAILED']), refusalReason:z.string().max(500).optional()});

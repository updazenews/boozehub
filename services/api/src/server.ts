import Fastify from 'fastify';
import { z } from 'zod';
import { addToSingleStoreCart, createOrder, DomainError } from './domain.ts';
const app=Fastify({logger:true});
const carts=new Map(); const products=new Map(); const stores=new Map();
function actor(request:any){ const id=request.headers['x-user-id']; const role=request.headers['x-role']; if(typeof id!=='string'||typeof role!=='string') throw new DomainError('UNAUTHENTICATED','Authentication is required.'); return {id,role}; }
app.setErrorHandler((error,_,reply)=>{ const known=error instanceof DomainError; reply.status(known?400:500).send({error:known?error.code:'INTERNAL_ERROR',message:known?error.message:'An unexpected error occurred.'}); });
app.get('/health',async()=>({status:'ok'}));
app.post('/api/cart/items',async(request)=>{const user=actor(request); if(user.role!=='CUSTOMER') throw new DomainError('FORBIDDEN','Customer access required.'); const body=z.object({productId:z.string().uuid(),quantity:z.number().int().positive(),conflictResolution:z.enum(['REPLACE_CART','KEEP_CURRENT_CART']).optional()}).parse(request.body); const product=products.get(body.productId); if(!product) throw new DomainError('NOT_FOUND','Product not found.'); const cart=addToSingleStoreCart(carts.get(user.id),user.id,product,body.quantity,body.conflictResolution); carts.set(user.id,cart); return cart;});
app.post('/api/orders',async(request)=>{const user=actor(request);if(user.role!=='CUSTOMER')throw new DomainError('FORBIDDEN','Customer access required.');const verified=request.headers['x-age-verified']==='true';const cart=carts.get(user.id);if(!cart)throw new DomainError('EMPTY_CART','Your cart is empty.');const store=stores.get(cart.storeId);const order=createOrder(cart,store,verified,3500,1000);return order;});
if (process.env.NODE_ENV !== 'test') app.listen({port:Number(process.env.PORT??3000),host:'0.0.0.0'});
export { app, carts, products, stores };

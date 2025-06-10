import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentMethod, createUserCart } from '../../store/actions';
import { memo } from 'react';

const PaymentMethod = memo(() => {
    const dispatch = useDispatch();
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, cartId } = useSelector((state) => state.carts);
    const { errorMessage } = useSelector((state) => state.errors);

    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }));
            
            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cartId, cart, errorMessage]);

    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method));
    }

    return (
        <div className='max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-16 border'>
            <h1 className='text-2xl font-semibold mb-4'>Select Payment Method</h1>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="payment method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => paymentMethodHandler(e.target.value)}
                >
                    <FormControlLabel 
                        value="Stripe" 
                        control={<Radio color='primary' />} 
                        label="Stripe" 
                        className='text-gray-700'/>

                    <FormControlLabel 
                        value="Paypal" 
                        control={<Radio color='primary' />} 
                        label="Paypal" 
                        className='text-gray-700'/>
                </RadioGroup>
            </FormControl>
        </div>
    )
})

PaymentMethod.displayName = 'PaymentMethod'

export default PaymentMethod
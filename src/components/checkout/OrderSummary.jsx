import { formatPriceCalculation } from '../../utils/formatPrice';
import PropTypes from 'prop-types';
import { memo } from 'react';

const OrderSummary = memo(({ totalPrice, cart, address, paymentMethod }) => {
  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 pr-4">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Billing Address</h2>
              {address ? (
                <>
                  <p>
                    <strong>Building Name: </strong>
                    {address.buildingName}
                  </p>
                  <p>
                    <strong>City: </strong>
                    {address.city}
                  </p>
                  <p>
                    <strong>Street: </strong>
                    {address.street}
                  </p>
                  <p>
                    <strong>State: </strong>
                    {address.state}
                  </p>
                  <p>
                    <strong>Pincode: </strong>
                    {address.pincode}
                  </p>
                  <p>
                    <strong>Country: </strong>
                    {address.country}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No address selected</p>
              )}
            </div>
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod || 'Not selected'}
              </p>
            </div>

            <div className="pb-4 border rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-semibold mb-2">Order Items</h2>
              <div className="space-y-2">
                {cart?.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.productId} className="flex items-center">
                      <img
                        src={`${import.meta.env.VITE_BACK_END_URL}/images/${item.image}`}
                        alt={item.productName}
                        className="w-12 h-12 rounded"
                        loading="lazy"
                      />
                      <div className="text-gray-500">
                        <p>{item.productName}</p>
                        <p>
                          {item.quantity} x ${item.specialPrice} = $
                          {formatPriceCalculation(item.quantity, item.specialPrice)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items in cart</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="border rounded-lg shadow-sm p-4 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>SubTotal</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

OrderSummary.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      specialPrice: PropTypes.number.isRequired,
    })
  ),
  address: PropTypes.shape({
    buildingName: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    state: PropTypes.string,
    pincode: PropTypes.string,
    country: PropTypes.string,
  }),
  paymentMethod: PropTypes.string,
};

OrderSummary.defaultProps = {
  cart: [],
  address: null,
  paymentMethod: '',
};

OrderSummary.displayName = 'OrderSummary';

export default OrderSummary;
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Divider } from '@mui/material';
import Status from './Status';
import { MdClose, MdDone } from 'react-icons/md';
import PropTypes from 'prop-types';
import { memo } from 'react';

const ProductViewModal = memo(({ open, setOpen, product, isAvailable }) => {
  const { productName, image, description, price, specialPrice } = product;

  return (
    <Dialog 
      open={open} 
      as="div" 
      className="relative z-10" 
      onClose={() => setOpen(false)}
    >
      <DialogBackdrop 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-title"
          >
            {image && (
              <div className="flex justify-center aspect-[3/2]">
                <img 
                  src={image}
                  alt={productName}
                  loading="lazy"
                />
              </div>
            )}

            <div className="px-6 pt-10 pb-2">
              <DialogTitle 
                as="h1" 
                id="product-title"
                className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4"
              >
                {productName}
              </DialogTitle>

              <div className="space-y-2 text-gray-700 pb-4">
                <div className="flex items-center justify-between gap-2">
                  {specialPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through">
                        ${Number(price).toFixed(2)}
                      </span>
                      <span className="sm:text-xl font-semibold text-slate-700">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold">
                      ${Number(price).toFixed(2)}
                    </span>
                  )}

                  {isAvailable ? (
                    <Status
                      text="In Stock"
                      icon={MdDone}
                      bg="bg-teal-200"
                      color="text-teal-900"
                    />
                  ) : (
                    <Status
                      text="Out-Of-Stock"
                      icon={MdClose}
                      bg="bg-rose-200"
                      color="text-rose-700"
                    />
                  )}
                </div>

                <Divider />

                <p>{description}</p>
              </div>
            </div>

            <div className="px-6 py-4 flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-700 hover:text-slate-800 hover:border-slate-800 rounded-md"
                aria-label="Close modal"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
});

ProductViewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    productName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    specialPrice: PropTypes.number,
  }).isRequired,
};

ProductViewModal.defaultProps = {
  product: {
    quantity: 0,
    discount: 0,
    specialPrice: 0,
  },
};

ProductViewModal.displayName = 'ProductViewModal';

export default ProductViewModal;
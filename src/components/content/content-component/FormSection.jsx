import { forwardRef } from "react";

const FormSection = forwardRef(function FormSection(
  {
    cart,
    method,
    setMethod,
    countSubtotal,
    shippingCost,
    totalPrice,
    onRemoveFromCart,
    onQuantityChange,
    onSubmit,
    toggleForm
  },
  ref
) {
  return (
    <div ref={ref} className="fixed z-20 bg-white top-[51px] left-[51px] right-0 bottom-0 overflow-y-auto">
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Shopping Form</h1>
          <button onClick={toggleForm} className="border px-3 py-2 rounded-md hover:bg-gray-100">
            Close
          </button>
        </div>
        <form onSubmit={onSubmit} className="bg-[#fafafa] border border-[#d7d7d7] rounded-md px-6 py-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Section title="Contact Information">
                <InputField id="email" label="Email Address" placeholder="example@mail.com" required />
              </Section>

              <Section title="Shipping Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField id="firstname" label="First Name" required />
                  <InputField id="lastname" label="Last Name" required />
                </div>
                <InputField id="company" label="Company" required />
                <InputField id="address" label="Address" required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField id="city" label="City" required />
                  <InputField id="postal" label="Postal Code" required />
                </div>
                <InputField id="country" label="Country" required />
              </Section>

              <Section title="Delivery Method">
                <div className="grid sm:grid-cols-2 gap-4">
                  <DeliveryOption
                    label="Standard"
                    desc="6–10 Business days"
                    price={4}
                    selected={method === 0}
                    onClick={() => setMethod(0)}
                  />
                  <DeliveryOption
                    label="Express"
                    desc="3–5 Business days"
                    price={15}
                    selected={method === 1}
                    onClick={() => setMethod(1)}
                  />
                </div>
              </Section>

              <Section title="Payment">
                <div className="flex items-center gap-6 flex-wrap">
                  {["PayPal", "Credit Card", "E-Transfer"].map((method) => (
                    <label key={method} className="flex items-center gap-2">
                      <input type="radio" name="payment" value={method.toLowerCase()} required />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
                <InputField id="card-number" label="Card Number" type="number" required />
              </Section>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="border border-[#d7d7d7] rounded-md divide-y divide-gray-200">
                {cart.map((book) => (
                  <div key={book.book_id} className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg">{book.title}</h3>
                      <p className="text-sm text-gray-600">{`${book.author_firstname} ${book.author_lastname}`}</p>
                      <span className="font-medium">{`$${book.price}`}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(book.book_id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                      <select
                        value={book.quantity}
                        onChange={(e) => onQuantityChange(book.book_id, e.target.value)}
                        className="border border-[#d7d7d7] rounded px-2 py-1"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                <div className="p-4 space-y-2">
                  <SummaryLine label="Subtotal" value={`$${countSubtotal()}`} />
                  <SummaryLine label="Shipping" value={`$${shippingCost()}`} />
                  <SummaryLine label="Taxes" value="$5.89" />
                  <SummaryLine label="Total" value={`$${totalPrice()}`} bold />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default FormSection;

function InputField({ id, label, placeholder = "", type = "text", required = false }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border border-[#d7d7d7] rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {children}
    </div>
  );
}

function DeliveryOption({ label, desc, price, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border border-[#d7d7d7] rounded-md p-4 w-full text-left ${selected ? "border-indigo-500" : "border-[#d7d7d7]"} hover:bg-gray-50`}
    >
      <h4 className="font-medium">{label}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
      <p className="font-medium mt-2">${price.toFixed(2)}</p>
    </button>
  );
}

function SummaryLine({ label, value, bold = false }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-semibold" : ""}>{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}

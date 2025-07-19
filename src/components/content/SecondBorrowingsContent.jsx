import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import RowData from "./content-component/RowData";
import RowDataMenu from "./content-component/RowDataMenu";
import Badge from "./content-component/Badge";
import FormSection from "./content-component/FormSection";
import CartSidebar from "./content-component/CartSidebar";
import SearchBar from "./content-component/SearchBar";
import StatsCards from "./content-component/StatsCards";
import BorrowingsTable from "./content-component/BorrowingsTable";

import { isBookInCart } from "./utils/helper";

gsap.registerPlugin(useGSAP);

export default function SecondBorrowingsContent() {
  const [books, setBooks] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [method, setMethod] = useState(0);
  const [totalLoan, setTotalLoan] = useState(0);

  const addLoan = useRef(null);
  const loanProcess = useRef(null);

  useGSAP(() => {
    gsap.set(addLoan.current, { xPercent: 100 });
    gsap.set(loanProcess.current, { xPercent: 100 });
  });

  useEffect(() => {
    fetchBooks();
    fetchBorrowings();
  }, []);

  useEffect(() => {
    const total = borrowings.reduce((sum, b) => sum + Number(b.total_price || 0), 0);
    setTotalLoan(total);
  }, [borrowings]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
  };

  const fetchBorrowings = async () => {
    try {
      const res = await axios.get("http://localhost:3001/borrower");
      setBorrowings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch borrowings", err);
    }
  };

  const handleAddToCart = (book) => {
    setCart((prev) => (isBookInCart(prev, book.book_id) ? prev : [...prev, { ...book, quantity: 1 }]));
  };

  const handleRemoveFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => item.book_id !== bookId));
  };

  const handleQuantityChange = (bookId, newQty) => {
    setCart((prev) => prev.map((item) => item.book_id === bookId ? { ...item, quantity: Number(newQty) } : item));
  };

  const toggleSidebar = () => {
    gsap.to(addLoan.current, { xPercent: isOpen ? 100 : 0, duration: 0.3, ease: "power2.out" });
    setIsOpen(!isOpen);
  };

  const toggleForm = () => {
    gsap.to(loanProcess.current, { xPercent: isOpenTwo ? 100 : 0, duration: 0.3, ease: "power2.out" });
    setIsOpenTwo(!isOpenTwo);
  };

  const filteredBorrowings = borrowings.filter((item) => {
    return [
      item.borrower,
      item.borrower_email,
      item.book_title,
      item.book_author
    ].some((field) => field.toLowerCase().includes(search.toLowerCase()));
  });

  const countSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const shippingCost = () => (method === 0 ? 4 : 15);

  const totalPrice = () => (parseFloat(countSubtotal()) + shippingCost() + 5.89).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = cart.map((item) => ({
      borrower: `${form.firstname.value} ${form.lastname.value}`,
      borrower_email: form.email.value,
      book_title: item.title,
      book_author: `${item.author_firstname} ${item.author_lastname}`,
      count: item.quantity,
      total_price: item.price * item.quantity,
      company: form.company.value,
      address: form.address.value,
      city: form.city.value,
      country: form.country.value,
      postal: form.postal.value,
      deadline: new Date().toISOString().slice(0, 10),
    }));

    try {
      await Promise.all(payload.map((entry) => axios.post("http://localhost:3001/borrower", entry)));
      setCart([]);
      toggleForm();
      toggleSidebar();
      fetchBorrowings();
      alert("Order berhasil dikirim!");
    } catch (err) {
      console.error("Gagal mengirim order!", err);
      alert("Gagal mengirim order!");
    }
  };

  return (
    <div className="relative w-full h-full overflow-y-auto bg-transparent">
      <StatsCards totalLoan={totalLoan} />
      <SearchBar search={search} setSearch={setSearch} toggleSidebar={toggleSidebar} />
      <BorrowingsTable data={filteredBorrowings} />
      <CartSidebar
        ref={addLoan}
        books={books}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        isBookInCart={isBookInCart}
        toggleForm={toggleForm}
        toggleSidebar={toggleSidebar}
      />
      <FormSection
        ref={loanProcess}
        cart={cart}
        method={method}
        setMethod={setMethod}
        countSubtotal={countSubtotal}
        shippingCost={shippingCost}
        totalPrice={totalPrice}
        onRemoveFromCart={handleRemoveFromCart}
        onQuantityChange={handleQuantityChange}
        onSubmit={handleSubmit}
        toggleForm={toggleForm}
      />
    </div>
  );
}

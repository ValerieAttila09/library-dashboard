export function isBookInCart(cart, bookId) {
  return cart.some(item => item.book_id === bookId);
}

import React from 'react';
import CartItem from './CartItem';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  close = () => {
    this.setState({ isOpen: false });
  };
  open = () => {
    this.setState({ isOpen: true });
  };
  render() {
    const { isOpen } = this.state;
    let totalQuantity = this.props.cartItems.reduce((acc, cv) => {
      acc = acc + cv.quantity;
      return acc;
    }, 0);

    let totalAmount = this.props.cartItems.reduce((acc, cv) => {
      acc = acc + cv.price * cv.quantity;
      return acc;
    }, 0);

    if (!isOpen) {
      return <ClosedCart open={this.open} totalQuantity={totalQuantity} />;
    }
    return (
      <>
        <aside className="cart">
          <div onClick={this.close} className="close-btn">
            X
          </div>
          <div className="cart-body">
            <div className="cart-heading">
              <div className="cart-icon-inner">
                <img alt="" src="/static/trolley.png" />
              </div>
              <span className="item-count">{totalQuantity}</span>
            </div>
            <h2>Cart</h2>
          </div>
          {this.props.cartItems.map((item) => {
            return (
              <CartItem
                {...item}
                incrementQuantity={this.props.incrementQuantity}
                decrementQuantity={this.props.decrementQuantity}
                deleteItem={this.props.deleteItem}
              />
            );
          })}
          <div className="cart-checkout">
            <div className="flex justify-between subtotal">
              <p>SUBTOTAL</p>
              <p>$ {totalAmount}</p>
            </div>
          </div>
          <div className="center">
            <button
              onClick={() => alert(`Total amount is:$ ${totalAmount}`)}
              className="btn-check"
            >
              CHECKOUT
            </button>
          </div>
        </aside>
      </>
    );
  }
}

function ClosedCart(props) {
  return (
    <div className="close-cart">
      <span onClick={props.open} className="open-btn">
        <div className="cart-icon">
          <img alt="cart" src="/static/trolley.png" />
          <span className="item-count">{props.totalQuantity}</span>
        </div>
      </span>
    </div>
  );
}

export default Cart;

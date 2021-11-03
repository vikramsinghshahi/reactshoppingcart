import { products } from './data.json';
import Main from './Main';
import Sidebar from './Sidebar';
import Cart from './Cart';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSizes: [],
      cartItems: [],
    };
  }

  // componentDidUpdate() {
  //   this.handleUpdateLocalStorage();
  // }

  componentDidMount() {
    if (localStorage.carts) {
      this.setState({ cartItems: JSON.parse(localStorage.carts) || [] });
    }

    window.addEventListener('beforeunload', this.handleUpdateLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUpdateLocalStorage);
  }

  handleUpdateLocalStorage = () => {
    localStorage.setItem('carts', JSON.stringify(this.state.cartItems));
  };

  handleAddToCart = (p) => {
    let isPresent =
      this.state.cartItems.findIndex((product) => product.id === p.id) !== -1;
    if (isPresent) {
      this.incrementQuantity(p.id);
    } else {
      this.setState((prevState) => ({
        cartItems: prevState.cartItems.concat({ ...p, quantity: 1 }),
      }));
    }
  };

  incrementQuantity = (id) => {
    this.setState((prevState) => {
      let updatedCartItem = prevState.cartItems.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }
        return p;
      });
      return {
        cartItems: updatedCartItem,
      };
    });
  };

  decrementQuantity = (id) => {
    this.setState((prevState) => {
      let updatedCartItem = prevState.cartItems.map((p) => {
        if (p.id === id && p.quantity > 0) {
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        }
        return p;
      });
      return {
        cartItems: updatedCartItem,
      };
    });
  };

  deleteItem = (id) => {
    this.setState((prevState) => {
      let updatedCartItem = prevState.cartItems.filter((p) => {
        return p.id !== id;
      });
      return {
        cartItems: updatedCartItem,
      };
    });
  };

  handleClick = (size) => {
    if (this.state.selectedSizes.includes(size)) {
      this.setState((prevState) => ({
        selectedSizes: prevState.selectedSizes.filter((s) => s !== size),
      }));
    } else {
      this.setState((prevState) => ({
        selectedSizes: prevState.selectedSizes.concat(size),
      }));
    }
  };

  render() {
    return (
      <>
        <header className="header">
          <h1>Shopping Cart </h1>
        </header>
        <div className="wrapper flex space-between">
          <Sidebar
            products={products}
            selectedSizes={this.state.selectedSizes}
            handleClick={this.handleClick}
          />
          <Main
            products={products}
            selectedSizes={this.state.selectedSizes}
            handleAddToCart={this.handleAddToCart}
          />
          <Cart
            cartItems={this.state.cartItems}
            incrementQuantity={this.incrementQuantity}
            decrementQuantity={this.decrementQuantity}
            deleteItem={this.deleteItem}
          />
        </div>
      </>
    );
  }
}

export default App;

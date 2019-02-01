import React, { Component } from 'react';
import './App.css';
import Tile from './components/Tile';
import ProductForm from './components/ProductForm';
import ProductShow from './components/ProductShow';
import Auth from './components/Auth';
import Search from './components/Search';
import SearchResult from './components/SearchResult';
import Comparison from './components/Comparison';
import ConversationsList from './components/ConversationsList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      activeProduct: null,
      modal: false,
      search: false
    }
  }

  componentDidMount() {
    // fetch all the data from our API
    // update our state "products" with that data
    console.log('fetching data');
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          products: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  createNewProduct(product) {
    /* 
      posts data to the database, the database
      sends that same data back.
      add that data to the 'products' state
    */
    const url = 'http://localhost:3000/products'
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        console.log('DATA')
        console.log(data);
        const updateProducts = this.state.products.concat([data]);
        //  console.log(updatedProducts)
        this.setState({
          products: updateProducts,
          activeProduct: data,
          modal: false,
          search: false
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateProduct(product) {
    const url = `http://localhost:3000/products/${product.id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {

        const updateProducts = this.state.products.map(el => {
          return el.id === data.id ? data : el
        })
        console.log('current state: ', this.state.producs);
        console.log('new state: ', updateProducts)

        this.setState({
          products: updateProducts,
          activeProduct: product,
          modal: false
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteProduct(id) {
    const url = `http://localhost:3000/products/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        const updateProducts = this.state.products.filter(product => product.id !== id)
        this.setState({
          products: updateProducts,
          activeProduct: null
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleSubmit(product) {
    if (this.state.activeProduct) {
    this.updateProduct(product);
    } else {
    this.createNewProduct(product)
    }
  }

  renderTiles(allProducts) {
    // map through the state "products" 
    // and make a tile for each product
    return allProducts.map((product) => {
      return (
        <Tile key={product.id}
          product={product}
          // name={product.name} 
          // image={product.image}
          setCurrentProduct={this.setCurrentProduct.bind(this)}
          renderProduct={this.renderProduct.bind(this)}
        />
      )
    })
  }

  renderProduct(product) {
    console.log("product")
    this.setState({ activeProduct: product })
  }

  setCurrentProduct(product) {
    console.log('setting product');
    console.log(product);
    this.setState({
      activeProduct: product
    })
    // when given a product, set state 'activeProduct' to that product
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggleSearch() {
    this.setState({
      search: !this.state.search
    })
  }




  renderContent() {
    if (this.state.search) {
      return <Search toggleSearch={this.toggleSearch.bind(this)} saveProduct={this.createNewProduct.bind(this)} />
    } else if (this.state.activeProduct) {
      return (
        <product
          setCurrentProduct={this.setCurrentProduct.bind(this)}
          activeProduct={this.state.activeProduct}
          deleteProduct={this.deleteProduct.bind(this)}
          toggleModal={this.toggleModal.bind(this)}
        />
      )
    } else {
      return (
        <div className="products">
          <div className="action-buttons">
            <div onClick={this.toggleSearch.bind(this)}>
              <img src="https://i.imgur.com/WX7bym4.png" alt="" />
            </div>
            <div className="new-product" onClick={this.toggleModal.bind(this)}>Add New Product</div>
          </div>
          {this.renderTiles(this.state.products)}
        </div>
      )
    }
  }

  render() {
    return (
      <div>

        <header>Recent Products added</header>
        <div className="Nav"></div>
        {this.renderContent()}
        {this.state.modal ?
          <ProductForm
            handleSubmit={this.handleSubmit.bind(this)}
            toggleModal={this.toggleModal.bind(this)}
            activeProduct={this.state.activeProduct}
          /> : ''}
        {this.state.activeProduct ?
          <ProductShow
            setCurrentProduct={this.setCurrentProduct.bind(this)}
            activeProduct={this.state.activeProduct}
            toggleModal={this.toggleModal.bind(this)}
            deleteProduct={this.deleteProduct.bind(this)}
          /> : ''}

        <ConversationsList />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Tile from './components/Tile';
import ProductForm from './components/ProductForm';
import ProductShow from './components/ProductShow';
import AuthForm from './components/AuthForm';
import Categories from './components/Categories';
import ProductsByCategory from './components/ProductsByCategory';
//import ReviewForm from './components/ReviewForm';
//import Review from './components/Review'
import {getUser , login , logout} from './servies/authService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      activeProduct: null,
      modal: false,
      search: false,
      categories: [],
      activeCategory: null,
      renderProducts: [],
      reviews:[],
      activeReview: null,
      form: "login"

    }
  }

  checkForUser = () => {
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }
  

  componentDidMount() {
    // fetch all the data from our API
    // update our state "categories" with that data

    this.checkForUser();
    console.log('fetching data');
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          categories: data
        })
      })
      .catch(error => {
        console.log(error)
      });

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

  createNewReview(review) {

    const url = 'http://localhost:3000/reviews'
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: JSON.stringify(review)
    })
      .then(response => response.json())
      .then(data => {
        console.log('DATA')
        console.log(data);
        const updateReviews = this.state.reviews.concat([data]);

        this.setState({
          reviews: updateReviews,
          activeReview: data,
          modal: false,

        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteReview(id) {
    const url = `http://localhost:3000/reviews/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const updateReviews = this.state.reviews.filter(review => review.id !== id)
        this.setState({
          reviews: updateReviews,
          activeReview: null
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  handleSubmitReview(review) {
    if (this.state.activeReview) {
      this.deleteReview(review);
    } else {
      this.createNewReview(review)
    }
  }

  renderAllReviews(allReviews) {
    return allReviews.map((review) => {
      return (
        <div> Review </div>
        // <Review key={review.id}
        //   review={review}
        //   renderReview={this.renderReview.bind(this)}
        // />
      )
    })
  }

  renderReview(review) {
    console.log("review")
    this.setState({ activeReview: review })
  }

  login = () => {
        const user = getUser();
        login();
        this.setState({ user });
      };
    
      logout = () => {
        logout();
        this.setState({ user: null });
      };


  handleClick(categoryId) {
    console.log(categoryId);
    console.log(this.state.products);
    const filterCategory = this.state.products.filter(el => {
      return el.category_id === categoryId
    });

    this.setState({
      renderProducts: filterCategory
    })
    console.log(filterCategory);
  }

  renderCaregories(allCategories) {

    return allCategories.map((category) => {
      return (
        <Categories key={category.id}
          category={category}
          handleClick={() => { this.handleClick(category.id) }}
  
        />
      )
    })
  }

  renderCategory(category) {
    console.log("product")
    this.setState({ activeCategory: category })
  }

  setCurrentCategory(category) {
    console.log('setting category');
    console.log(category);
    this.setState({
      activeCategory: category
    })
  
  }


  createNewProduct(product) {
    const formData = new FormData();
    Object.keys(product).forEach(attribute => {
      formData.append(`product[${attribute}]`, product[attribute])
    })

    const url = 'http://localhost:3000/products'
  
    axios.post(url, formData)
      .then(data => {
        console.log('DATA')
        console.log(data);
        const updateProducts = this.state.products.concat([data.data]);
        
        this.setState({
          products: updateProducts,
          activeProduct: data.data,
          modal: false
      
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  updateProduct(product) {
    const formData = new FormData();
    Object.keys(product).forEach(attribute => {
      formData.append(`product[${attribute}]`, product[attribute])
    })
    const url = `http://localhost:3000/products/${product.id}`

    axios.put(url, formData)

      .then(data => {
        console.log('DATA')
        console.log(data);
        const updateProducts = this.state.products.concat([data.data]);

        this.setState({
          products: updateProducts,
          activeProduct: data.product,
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
        console.log(data);
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
  
    return allProducts.map((product) => {
      return (
        <Tile key={product.id}
          product={product}
      
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
   
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

 
  renderContent() {
    if (this.state.activeProduct) {
      return (
        <ProductShow
          setCurrentProduct={this.setCurrentProduct.bind(this)}
          activeProduct={this.state.activeProduct}
          deleteProduct={this.deleteProduct.bind(this)}
          toggleModal={this.toggleModal.bind(this)}
          handleSubmitReview={this.handleSubmitReview.bind(this)}
        />
      )
    } else {
      return (
        <div className="products">
          {this.renderTiles(this.state.products)}
        </div>
      )
    }
  }

  renderProductsByCategory(PBC) {
    return PBC.map(product => {
      return (
        <ProductsByCategory
          key={product.id}
          product={product}
        
          setCurrentProduct={this.setCurrentProduct.bind(this)}
          renderProduct={this.renderProduct.bind(this)}
        />
      )
    }
    )
  }

  render() {

    
    return (


   
      <div>


<button onClick={ () =>  this.setState({form:"signup"})}> signup </button>

<button onClick={() => this.setState({form:"login"}) }> login </button>
         {this.state.form === 'signup' ?  <AuthForm form="signup" onLogin={this.login} /> : false}
         {this.state.form === 'login' ?  <AuthForm form="login" onLogin={this.login}/>: ''}
 
        <div className="firstNav"></div>
        <div className="categories">
          {this.renderCaregories(this.state.categories)}</div>
        {this.renderProductsByCategory(this.state.renderProducts)}
        <header>Recent Products added</header>
        <div className="new-product" onClick={this.toggleModal.bind(this)}>Add New Product</div>
        <div className="Nav"></div>
        {this.renderContent()}
        {this.state.modal ?

          <ProductForm
            handleSubmit={this.handleSubmit.bind(this)}
            toggleModal={this.toggleModal.bind(this)}
            activeProduct={this.state.activeProduct}
            categories={this.state.categories}
          /> : ''}
    
      </div>
    );
  }
}

export default App;
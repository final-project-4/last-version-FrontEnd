import React, { Component } from 'react';

class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.activeProduct ? props.activeProduct.name : '',
            brand: props.activeProduct ? props.activeProduct.brand : '',
            description: props.activeProduct ? props.activeProduct.description : '',
            expected_price: props.activeProduct ? props.activeProduct.expected_price : '',
            color: props.activeProduct ? props.activeProduct.color : '',
            model_year: props.activeProduct ? props.activeProduct.model_year : '',
            image: props.activeProduct ? props.activeProduct.image : '',
            id: props.activeProduct ? props.activeProduct.id : null
        }
    }

    handleChange(event) {
        const currentInput = event.target.name;
        const newValue = event.target.value;
        console.log('current input: ', currentInput);
        console.log('newValue: ', newValue);


        this.setState({
            [currentInput]: newValue
        }, function () {
            console.log(this.state);
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("handiling submit", this.state)
        this.props.handleSubmit(this.state) //we need if statemt here 
        //when ever we create we need id 
    }


    render() {
        return (
            <div className='modal'>
                <form className='show-form' onSubmit={this.handleSubmit.bind(this)}>
                    <label>name:</label><input type="text" value={this.state.name} name="name" onChange={this.handleChange.bind(this)} /><br />
                    <label>brand:</label><input type="text" value={this.state.brand} name="brand" onChange={this.handleChange.bind(this)} /><br />
                    <label>description: </label><input type="text" value={this.state.description} name="description" onChange={this.handleChange.bind(this)} /><br />
                    <label>expected price:</label><input type="text" value={this.state.expected_price} name="expected_price" onChange={this.handleChange.bind(this)} /><br />
                    <label>color #:</label><input type="text" value={this.state.color} name="color" onChange={this.handleChange.bind(this)} /><br />
                    <label>model year:</label><input type="text" value={this.state.model_year} name="model_year" onChange={this.handleChange.bind(this)} /><br />
                    {/* <label>image:</label><input type="text" value={this.state.needed} name="needed" onChange={this.handleChange.bind(this)} /><br /> */}
                    <label>image:</label><input type="text" value={this.state.image} name="image" onChange={this.handleChange.bind(this)} /><br />
                    <button className='close-modal' onClick={() => { this.props.toggleModal() }}>Cancel</button>
                    <br></br>
                    <button name="submit">Submit</button>
                </form>
            </div>

        )
    }
}

export default ProductForm;
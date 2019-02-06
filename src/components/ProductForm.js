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
            id: props.activeProduct ? props.activeProduct.id : null,
            category_id:props.activeProduct ? Number(props.activeProduct.category_id): props.categories[0].id

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
    handleFile(event){
                this.setState({
                    image: event.target.files[0]
                })
            } 

    handleSubmit(event) {
        event.preventDefault();
        console.log("handiling submit", this.state)
        this.props.handleSubmit(this.state) //we need if statemt here 
        //when ever we create we need id 
    }

    renaderOption(categories){
        console.log(categories);
        return categories.map(el => {
            return <option value={el.id}>{el.name}</option>
        })
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
                    <label>category id: </label>
                    <select name='category_id' onChange={this.handleChange.bind(this)} value={this.state.category_id}>
                        {this.renaderOption(this.props.categories)}
                    </select>
                   <label>image:</label><input type="file"  name="image" onChange={this.handleFile.bind(this)} /><br />
                    {/* <label>image:</label><input type="text" value={this.state.image} name="image" onChange={this.handleChange.bind(this)} /><br /> */}
                    <button className='close-modal' onClick={() => { this.props.toggleModal() }}>Cancel</button>
                    <br></br>
                    <button name="submit">Submit</button>
                </form>
            </div>

        )
    }
}

export default ProductForm;






// import React, { Component } from 'react';

// class ProductForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: props.activeProduct ? props.activeProduct.name : '',
//             brand: props.activeProduct ? props.activeProduct.brand : '',
//             description: props.activeProduct ? props.activeProduct.description : '',
//             expected_price: props.activeProduct ? props.activeProduct.expected_price : '',
//             color: props.activeProduct ? props.activeProduct.color : '',
//             model_year: props.activeProduct ? props.activeProduct.model_year : '',
//             image: props.activeProduct ? props.activeProduct.image : '',
//             id: props.activeProduct ? props.activeProduct.id : null,
//             category_id:props.activeProduct ? Number(props.activeProduct.category_id): 0

//         }
//     }

//     handleChange(event) {
//         const currentInput = event.target.name;
//         const newValue = event.target.value;
//         console.log('current input: ', currentInput);
//         console.log('newValue: ', newValue);

// ////
//         this.setState({
//             [currentInput]: newValue
//         }, function () {
//             console.log(this.state);
//         })
//     }
// /////
//     handleFile( event ){
//         this.setState({
//             image: event.target.files[0]
//         })
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         console.log("handiling submit", this.state)
//         this.props.handleSubmit(this.state) //we need if statemt here 
//         //when ever we create we need id 
//     }


//     render() {
//         return (
//             <div className='modal'>
//                 <form className='show-form' onSubmit={this.handleSubmit.bind(this)}>
//                     <label>name:</label><input type="text" value={this.state.name} name="name" onChange={this.handleChange.bind(this)} /><br />
//                     <label>brand:</label><input type="text" value={this.state.brand} name="brand" onChange={this.handleChange.bind(this)} /><br />
//                     <label>description: </label><input type="text" value={this.state.description} name="description" onChange={this.handleChange.bind(this)} /><br />
//                     <label>expected price:</label><input type="text" value={this.state.expected_price} name="expected_price" onChange={this.handleChange.bind(this)} /><br />
//                     <label>color #:</label><input type="text" value={this.state.color} name="color" onChange={this.handleChange.bind(this)} /><br />
//                     <label>model year:</label><input type="text" value={this.state.model_year} name="model_year" onChange={this.handleChange.bind(this)} /><br />
//                     <label>category id: </label><input type="text" value={this.state.category_id} name="category_id" onChange={this.handleChange.bind(this)} /><br />
//                     <button className='close-modal' onClick={() => { this.props.toggleModal() }}>Cancel</button>
//                     <br></br>
//                     <button name="submit">Submit</button>
//                 </form>
//             </div>
// // we've changed the image type from text to file to be able to upload 
//         )
//     }
// }

// export default ProductForm;
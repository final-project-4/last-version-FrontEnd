import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewConversationForm extends React.Component {
  state = {
    title: '',
    results:[]
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ title: '' });
  };
// Jumanah doing the delete method for the conversation
  handeleDelete = d =>{
    d.preventDefault()
    fetch(`${API_ROOT}/conversations/${id}`, {
      method: 'DELETE',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({results:[]});
  }
 // add the delete method here and the update method here as well 
 // also in the backend we should do that 
  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>Add New Review:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;
import React, {Component} from 'react';
import axios from 'axios';

export default class Create extends Component {

    state = {
        author: '',
        title: '',
        date: new Date(),
        body: ''
    }

    submitForm = e => {
        e.preventDefault();
        axios.post('http://localhost:3001/posts', this.state)
          .then(res => {
            console.log(res);
            this.props.updateBlog(res.data);
          })
          .catch(err => console.log(err));
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        <input type="text" name="author" placeholder="New Blog, who this?" onChange={this.handleChange}/>
                    </label>
                    <label>
                        <input type="text" name="title" placeholder="Title" onChange={this.handleChange}/>
                    </label>
                    <input type="textarea" name="body" placeholder="What's on your mind?" onChange={this.handleChange}/>
                    <input type="submit" value="Submit" onClick={this.submitForm}/>
                </form>
            </div>
        );
    };
};
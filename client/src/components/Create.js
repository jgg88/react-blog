import React, {Component} from 'react';
import axios from 'axios';

export default class Create extends Component {

    state = {
        author: '',
        title: '',
        date: new Date(),
        body: ''
    }

    submitForm = () => {
        // var data = new FormData();
        var data = {author: "New name",
            title: "NEW BLOG",
            date: "03/04/19",
            body: " My new post has been submitted!"}

        axios.post('http://localhost:3001/posts', this.state)
          .then((response) => {
            console.log(response);
            this.props.updateBlog(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
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
            // <button onClick={this.submitForm}>Test sending</button>
        );
    };
};
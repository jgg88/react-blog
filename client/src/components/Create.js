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

    updatePost = e => {
        e.preventDefault();
        axios.put(`http://localhost:3001/posts/${this.props.edit.id}`, this.state)
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err));
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentWillMount() {
        if (this.props.edit) {
            this.setState({
                author: this.props.edit.author,
                title: this.props.edit.title,
                date: this.props.edit.date,
                body: this.props.edit.body,
            })
        }
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        <input type="text" name="author" placeholder="New Blog, who this?" onChange={this.handleChange} defaultValue={this.state.author}/>
                    </label>
                    <label>
                        <input type="text" name="title" placeholder="Title" onChange={this.handleChange} defaultValue={this.state.title}/>
                    </label>
                    <input type="textarea" name="body" placeholder="What's on your mind?" onChange={this.handleChange} defaultValue={this.state.body}/>

                    {this.props.edit ? <input type="submit" value="Update" onClick={this.updatePost}/> : <input type="submit" value="Add" onClick={this.submitForm}/>}
                </form>
            </div>
        );
    };
};
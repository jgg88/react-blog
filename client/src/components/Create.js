import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';

export default class Create extends Component {

    state = {
        author: '',
        title: '',
        date: Date(),
        body: ''
    }

    componentWillMount() {
        //Checks whether inputs need to pre-populate, incase of EDIT to existing post
        if (this.props.edit) {
            this.setState({
                author: this.props.edit.author,
                title: this.props.edit.title,
                date: this.props.edit.date,
                body: this.props.edit.body,
            })
        }
    }

    //Submitting a NEW POST
    submitForm = e => {
        e.preventDefault();
        axios.post('http://localhost:3001/posts', this.state)
          .then(res => {
            console.log(res);
            this.props.updateStateForNewPost(res.data);
            this.props.toggle();
          })
          .catch(err => console.log(err));
    }

    //UPDATING an already existing post
    updatePost = e => {
        e.preventDefault();
        axios.put(`http://localhost:3001/posts/${this.props.edit.id}`, this.state)
          .then(res => {
            console.log(res);
            this.props.updateStateForEdited(res.data)
            this.props.toggle();
          })
          .catch(err => console.log(err));
    }

    //Update state as user inputs data
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className="create-body">
                <form>
                    <label>
                        <input type="text" name="title" placeholder="Title" onChange={this.handleChange} defaultValue={this.state.title} className="input-title"/>
                    </label>
                    <br/>
                    <label>
                        <input type="text" name="author" placeholder="Name" onChange={this.handleChange} defaultValue={this.state.author} className="input-author"/>
                    </label>
                    <br/>
                    <textarea name="body" placeholder="What's on your mind?" onChange={this.handleChange} defaultValue={this.state.body} className="input-body"/>
                    <br/>
                    {this.props.edit ? <input type="submit" value="Update" onClick={this.updatePost} className="submit-btn"/> : <input type="submit" value="Add" onClick={this.submitForm} className="submit-btn"/>}
                </form>
            </div>
        );
    };
};
import React, {Component} from 'react';

export default class Create extends Component {

    state = {
        author: '',
        title: '',
        date: new Date(),
        body: ''
    }

    componentWillMount() {
        //Checks whether inputs need to pre-populate, incase of EDIT to existing post
        if (this.props.edit) {
            this.setState({
                author: this.props.edit.author,
                title: this.props.edit.title,
                date: new Date(),
                body: this.props.edit.body,
            })
        }
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
                    {this.props.edit ? <input type="submit" value="Update" onClick={(e) => {this.props.updatePost(e, this.state)}} className="submit-btn"/> : <input type="submit" value="Add" onClick={(e) => {this.props.submitNewPost(e, this.state)}} className="submit-btn"/>}
                </form>
            </div>
        );
    };
};
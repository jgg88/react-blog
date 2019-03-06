import React, {Component} from 'react';
import Create from './Create';
import Blog from './Blog';
import axios from 'axios';
import moment from 'moment';

export default class Main extends Component {

    state = {
        posts: [],
        showPosts: false,
        showCreateComponent: false,
        toBeEdited: null
    }

    componentDidMount() {
        axios.get('http://localhost:3001/posts')
            .then(res => {
                let formattedData = [];
                res.data.forEach(post => {
                    post.date = moment(post.date).format('MMMM Do YYYY');
                    formattedData.push(post);
                });
                this.setState({
                    posts: formattedData,
                    showPosts: true
                });
                console.log(formattedData)
            })
            .catch(error => console.log(error));
    }

    //Toggle views between Create component and Blog component
    toggleNewBlog = () => {
        this.setState({
            showPosts: !this.state.showPosts,
            showCreateComponent: !this.state.showCreateComponent,
            toBeEdited: null
        });
    }

    //Add new post to state
    updateStateForNewPost = newPost => {
        newPost.date = moment(newPost.date).format('MMMM Do YYYY');
        this.setState({posts: [...this.state.posts, newPost]});
    }

    //Update state for edited post
    updateStateForEdited = editedPost => {
        let postsCopy = [...this.state.posts];
        for (let i=0; i < postsCopy.length; i++) {
            if (postsCopy[i].id === editedPost.id) {
                postsCopy[i] = editedPost;
                this.setState({posts: postsCopy});
            }
        }
    };

    //When an existing post has been selected for edit, pass post data to create component
    onSelect = (id) => {
        this.state.posts.forEach(post => {
            if (post.id === id) {
                this.setState({
                    toBeEdited: post,
                    showPosts: false,
                    showCreateComponent: true,
                })
            }

        })
    }

    //Delete post
    onDelete = id => {
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(res => {
            console.log(res);
            this.setState({posts: this.state.posts.filter(post => post.id !== id)});
        });
    }

    render() {
        const {posts, showPosts, showCreateComponent} = this.state;
        return (
            <div className="main">
                <button onClick={this.toggleNewBlog} className="new-btn">{showPosts ? 'NEW' : 'X'}</button>

                {showCreateComponent && 
                <Create 
                    updateStateForNewPost={newPost => this.updateStateForNewPost(newPost)}
                    updateStateForEdited = {editedPost => this.updateStateForEdited(editedPost)}
                    edit={this.state.toBeEdited}
                    toggle={this.toggleNewBlog}
                />}

                {showPosts && 
                <Blog 
                    posts={posts.sort((a, b) => b.id - a.id)}
                    onDelete={id => this.onDelete(id)}
                    onSelect={id => this.onSelect(id)}
                />}
            </div>
        );
    };
};
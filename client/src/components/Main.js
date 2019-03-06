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
        //Fetch Blog posts
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

    //Submitting a NEW POST
    submitNewPost = (event, formState) => {
        console.log(formState)
        event.preventDefault();
        axios.post('http://localhost:3001/posts', formState)
            .then(res => {
            console.log(res);
            // this.props.updateStateForNewPost(res.data);
            let newPost = res.data
            newPost.date = moment(newPost.date).format('MMMM Do YYYY');
            this.setState({posts: [...this.state.posts, newPost]});
            this.toggleNewBlog();
            })
            .catch(err => console.log(err));
    }

    //UPDATING an already existing post
    updatePost = (e, formState) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/posts/${this.state.toBeEdited.id}`, formState)
            .then(res => {
            console.log(res);
            let editedPost = res.data;
            // this.props.updateStateForEdited(res.data)
            let postsCopy = [...this.state.posts];
            editedPost.date = moment(editedPost.date).format('MMMM Do YYYY');
            for (let i=0; i < postsCopy.length; i++) {
                if (postsCopy[i].id === editedPost.id) {
                    postsCopy[i] = editedPost;
                    this.setState({posts: postsCopy});
                }
            }
            this.toggleNewBlog();
            })
            .catch(err => console.log(err));
    }

    //DELETE selected post
    onDelete = id => {
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(res => {
            console.log(res);
            this.setState({posts: this.state.posts.filter(post => post.id !== id)});
        });
    }

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

    render() {
        const {posts, showPosts, showCreateComponent} = this.state;
        return (
            <div className="main">
                <button onClick={this.toggleNewBlog} className="new-btn">{showPosts ? 'NEW' : 'X'}</button>

                {showCreateComponent && 
                <Create 
                    updatePost={this.updatePost}
                    submitNewPost={this.submitNewPost}
                    edit={this.state.toBeEdited}
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
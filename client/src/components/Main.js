import React, {Component} from 'react';
import Create from './Create';
import Blog from './Blog';
import axios from 'axios';

export default class Main extends Component {

    state = {
        posts: [],
        showPosts: false,
        showCreateComponent: false
    }

    componentDidMount() {
        fetch('http://localhost:3001/posts')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    posts: json,
                    showPosts: true
                });
          console.log(this.state.posts);
        });
    }

    toggleNewBlog = () => {
        this.setState({
            showPosts: !this.state.showPosts,
            showCreateComponent: !this.state.showCreateComponent
        });
    }

    updateBlog = newPost => {
        this.setState({posts: [...this.state.posts, newPost]});
    }

    onDelete = id => {
        debugger;
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(res => {
        console.log(res);
        console.log(res.data);

        this.setState({posts: this.state.posts.filter(post => post.id !== id)});
        
      })
    }

    render() {
        const {posts, showPosts, showCreateComponent} = this.state;
        return (
            <div className="main">
                <button onClick={this.toggleNewBlog} className="new-btn">NEW</button>

                {showCreateComponent && <Create updateBlog={newPost => this.updateBlog(newPost)} />}

                {showPosts && <Blog posts={posts} onDelete={id => this.onDelete(id)}/>}
            </div>
        );
    };
};
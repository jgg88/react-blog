import React, {Component} from 'react';
import Create from './Create';
import Blog from './Blog';

export default class Main extends Component {

    state = {
        posts: [],
        showPosts: false,
        showCreateComponent: false
    }

    componentDidMount() {
        fetch('http://localhost:3001/posts')
            .then(response => response.json())
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

    updateBlog =(newPost) => {
        this.setState({posts: [...this.state.posts, newPost]});
    }

    render() {
        const {showPosts, showCreateComponent} = this.state;
        return (
            <div>
                <button onClick={this.toggleNewBlog}>New Blog</button>
                {showCreateComponent && <Create updateBlog={(newPost) => this.updateBlog(newPost)}/>}
                {showPosts && <Blog posts={this.state.posts}/>}
            </div>
        );
    };
};
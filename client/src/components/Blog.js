import React, {Component} from 'react';

export default class Blog extends Component {
    render() {
        const {posts} = this.props;
        return (
            <div className="blog-body">
                <div>
                    {posts.map(({id, author, title, date, body}) => (
                        <div key={id}>
                            <div className="icons">
                                <button onClick={() => this.props.onSelect(id)}><i className="fa fa-pencil"></i></button>
                                <button onClick={() => this.props.onDelete(id)}><i className="fa fa-trash"></i></button>
                            </div>
                            <h1>{title}</h1>
                            <h2>{author}</h2>
                            <h2>{date}</h2>
                            <p>{body}</p>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
};
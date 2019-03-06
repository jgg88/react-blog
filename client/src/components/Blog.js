import React, {Component} from 'react';
import Create from './Create';

export default class Blog extends Component {

    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        const {posts} = this.props;
        
        return (
            <div>
                <div>
                    {posts.map(({id, author, title, date, body}) => (

                        <div key={id}>
                            <h1>{title}</h1>
                            <h2>{author}</h2>
                            <h2>{date}</h2>
                            <p>{body}</p>

                        </div>
                    ))}
                </div>
            </div>
        );
    };
};
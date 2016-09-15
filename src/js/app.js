var CommentBox = React.createClass({
    render: function() {
        return (
            <b>Hello</b>, <em>world</em>!
        );
    }
});
ReactDOM.render(
    <CommentBox/>,
    document.getElementById('content')
);

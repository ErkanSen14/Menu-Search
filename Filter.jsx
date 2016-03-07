// Item represents item inputted by user
Filter = React.createClass({
  propTypes: {
  //get filters from user to filter menu items
    filter: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.filter.text}</li>
    );
  }
});

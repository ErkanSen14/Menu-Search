// Task component - represents a single todo item
Task = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: React.PropTypes.object.isRequired
  },

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  },

  render() {

    return (
      <li className="checked">
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>

        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
});

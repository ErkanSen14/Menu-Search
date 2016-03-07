// List of choices selected by user
ListOfChoices = React.createClass({
  getFilters() {
    return [
      { _id: 1, text: "This is filter 1" },
      { _id: 2, text: "This is filter 2" },
      { _id: 3, text: "This is filter 3" }
    ];
  },

  renderFilters() {
    return this.getFilters().map((filter) => {
      return <Filter key={filter._id} filter={filter} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderFilters()}
        </ul>
      </div>
    );
  }
});

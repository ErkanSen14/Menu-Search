// List of choices selected by user
ListOfChoices = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData(){

    return{
      filters: Filters.find({}).fetch
    }
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

//put menus variable in list2 as list2 renders before Menu-Search.jsx
menus=[]
menus2 = [];
List2 = React.createClass({

mixins: [ReactMeteorData],
  getMeteorData() {
     return {
       menus: db.find({}).fetch()
     }
   },
  renderTasks() {
    return this.data.menus.map((venue)=>{
      return <li key={venue.key}>{venue.name}</li>
    })
  },





  render() {

    return (
      <div className="container">
        <header>
        <h1>Restaurants</h1>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>

    </div>
    );
  }
});

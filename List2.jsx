//put menus variable in list2 as list2 renders before Menu-Search.jsx
menus=[]
menus2 = [];
List2 = React.createClass({

mixins: [ReactMeteorData],
  getMeteorData() {
     return {
       menus: db.find({},{sort: {percent: -1}}).fetch()
     }
   },
  renderTasks() {
    menus2=db.find({},{sort: {percent: -1}}).fetch()
    return this.data.menus.map((venue)=>{
      return <li key={venue.key}>{venue.percent+ " - "+venue.name}</li>
    })
  },





  render() {

    return (
      <div className="container">
        <header>
        <h1>Best Matched Restaurants</h1>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>

    </div>
    );
  }
});

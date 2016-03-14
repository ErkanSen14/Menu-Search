//put menus variable in list2 as list2 renders before Menu-Search.jsx
menus=[]
List2 = React.createClass({

mixins: [ReactMeteorData],
  getMeteorData() {
     return {
       tasks: Tasks.find({}).fetch()
     }
   },
  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  helloWorld(){

    console.log(db.find().fetch())
    console.log(menus[0])
    var CLIENT_ID = '2SPUX20KMHVCAOYFLKHQ3HG5VUV0EAQEWLRM4F2JYQRB0ERP';
    var CLIENT_SECRET = '1SUR3C1F43EO3GAWTHODWAN5NIABV0OG1SH0OFGRZ3PILMIW';
    var venueid="55d752d9498e5ac92779d87f"
    var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/' + venueid + '/menu?oauth_token=MYMLE5NHKL3YLE2A3U40MKIO0HTKOOR4IGUXFHHO4WKUMXUB&v=20160214';

    //get menus for sorting
    $.getJSON(API_ENDPOINT.replace('CLIENT_ID', CLIENT_ID).replace('CLIENT_SECRET', CLIENT_SECRET), function(result, status) {
      console.log(result);
      console.log(result.response.menu);
    })
    console.log("HELLO WORLD")
  },
  render() {
    return (
      <div className="container">
        <header>
          <h1>Best Matched Places</h1>
        </header>

        <ul>
          {this.helloWorld()}
        </ul>
      </div>
    );
  }
});

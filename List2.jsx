//put menus variable in list2 as list2 renders before Menu-Search.jsx
menus=[]
List2 = React.createClass({

mixins: [ReactMeteorData],
  getMeteorData() {
     return {
       menus: db.find({}).fetch()
     }
   },
  renderTasks() {
    return this.data.menus.map((venue)=>{
      return <li key={venue.key}>{venue.venue.percent}</li>
    })
  },

  helloWorld(){

    console.log(db.find().fetch())
    //check that the array is not empty since if it is, website will glitch as list2 renders before menus
    if(menus.length>0){
    for(var i=0; i<menus.length;i++){
    console.log(menus[0].place.venue.id)
    var venueid=menus[i].place.venue.id
    var CLIENT_ID = '2SPUX20KMHVCAOYFLKHQ3HG5VUV0EAQEWLRM4F2JYQRB0ERP';
    var CLIENT_SECRET = '1SUR3C1F43EO3GAWTHODWAN5NIABV0OG1SH0OFGRZ3PILMIW';
    var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/' + venueid + '/menu?oauth_token=MYMLE5NHKL3YLE2A3U40MKIO0HTKOOR4IGUXFHHO4WKUMXUB&v=20160214';

    //get menus for sorting
    $.getJSON(API_ENDPOINT.replace('CLIENT_ID', CLIENT_ID).replace('CLIENT_SECRET', CLIENT_SECRET), function(result, status) {
      if(result.response.menu.menus.count>=1)
      console.log(result.response.menu);

    })

  }}
},

  render() {

    return (
      <div className="container">
        <header>
        <h1>Best Matched Restaurants</h1>
        </header>
        <ul>
          {this.helloWorld()}
          {this.renderTasks()}
        </ul>

    </div>
    );
  }
});

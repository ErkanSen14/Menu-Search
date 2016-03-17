var totalPercentage
var totalCount = 0
var numOfInstances = 0
var storageArray = []
var nameOfPlace
var sortedMenu
var sortedMenus=[]
var venueid
// App component - represents the whole app
var count = 0


List1 = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData() {

    return {tasks: Tasks.find({}).fetch()}
  },
  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task}/>;
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    venueid=menus2[0].venue.place.venue.id

    console.log(sortedMenus[0])

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({text: text});

    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
    var CLIENT_ID = '2SPUX20KMHVCAOYFLKHQ3HG5VUV0EAQEWLRM4F2JYQRB0ERP';
    var CLIENT_SECRET = '1SUR3C1F43EO3GAWTHODWAN5NIABV0OG1SH0OFGRZ3PILMIW';
    console.log(menus2)
    //get menus
    //check that the array is not empty since if it is, website will glitch as list2 renders before menus
    if (menus2.length > 0) {
      var j=0
       function updateStuff(j,callback){

        var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/' + venueid + '/menu' + '?client_id=CLIENT_ID' + '&client_secret=CLIENT_SECRET' + '&v=20160315';

        //get menus for sorting
        $.getJSON(API_ENDPOINT.replace('CLIENT_ID', CLIENT_ID).replace('CLIENT_SECRET', CLIENT_SECRET), function(result, status) {
          if (result.response.menu.menus.count >= 1) {
            console.log(result.response.menu)

            function eachRecursive(obj) {

              for (var k in obj) {
                if (typeof obj[k] == "object" && obj[k] !== null)
                  eachRecursive(obj[k]);
                if (obj[k].hasOwnProperty('items') && obj[k] !== null && !(obj[k].items.hasOwnProperty('entries'))) {
                  count += obj[k].items.length
                  totalCount += obj[k].items.length
                  obj[k].items.forEach(function(value) {
                    if (value.hasOwnProperty('description')) {
                      var myFilters = Tasks.find({}).fetch()
                      var theFilters = _.chain(myFilters).pluck('text').flatten().value()

                      for (var n = 0; n < theFilters.length; n++) {
                        storageArray[n] = 0
                      }
                      for (var jophy = 0; jophy < storageArray.length; jophy++)
                        if (value.description.includes(theFilters[jophy])) {
                          storageArray[jophy] = 1

                        }
                      } else if (value.hasOwnProperty('name')) {
                      var myFilters = Tasks.find({}).fetch()
                      var theFilters = _.chain(myFilters).pluck('text').flatten().value()

                      for (var n = 0; n < theFilters.length; n++) {
                        storageArray[n] = 0
                      }
                      for (var jophy = 0; jophy < storageArray.length; jophy++)
                        if (value.name.includes(theFilters[jophy])) {
                          storageArray[jophy] = 1

                        }
                      }
                    //if each element of storageArray is 1, which means the string of the object contains the filter, then write to the console that that object matches the search filter criteria
                    if (identical(storageArray) && (value.description != null || value.name != null)) {
                      if (value.description != null)
                        console.log("FOUND AT " + value.description)
                      else if (value.name != null)
                        console.log("FOUND AT " + value.name)
                      numOfInstances++
                    }
                    function identical(array) {
                      for (var cesar = 0; cesar < array.length; cesar++) {
                        if (array[cesar] != 1) {
                          return false;
                        }
                      }
                      if (array.length = 0)
                        return false;

                      return true;
                    }
                  })
                  count = 0
                }

              }

            }

            eachRecursive(result.response.menu,updateDB())

          }

        })


      if(j<menus.length){
        j++
        venueid=menus2[j].venue.place.venue.id
        updateStuff(j)}
      }
      function updateDB(){

              var percentage = numOfInstances / totalCount * 100
              if (!isNaN(percentage)&&numOfInstances!=totalCount) {
                console.log("Percentage match is: " + percentage + "%")
                db.update({_id: menus2[j]._id}, {$set: {percent: percentage}
                })


              }
              if(numOfInstances==totalCount)
              {
                console.log("Percentage match is: " + percentage + "%")
                db.update({
                  _id: menus2[j]._id
                }, {
                  $set: {
                    percent: 0
                  }
                })
              }
              totalCount = 0
              numOfInstances = 0
              percentage = 0

    }
    updateStuff(j)
    }
  },
  render() {
    return (
      <div className="container">
        <header>
          <h1>Filter List</h1>
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input type="text" ref="textInput" placeholder="Type to add new filters"/>
          </form>
          <button onClick={this.handleSubmit}>Add Filter</button>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});

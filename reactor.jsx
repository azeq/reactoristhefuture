/** @jsx React.DOM */

Bookmarks = new Meteor.Collection("bookmarks");

if (Meteor.isClient) {
  Meteor.startup(function() {
    //Init some view components with datas
    Session.set("data", data18);//init table
    Session.set("connectionState", {connectionState: "label-default", connectionInfo: "Not connected"});//init table

    //Build the view
    React.renderComponent(
      <Main title={".title."}/>,
      document.body
      );
  });

  Deps.autorun(function () {
    var bks = Bookmarks.find().fetch();
    if (bks){
      Session.set("bks", bks);
      // console.log("Bookmarks have been updated");       
    }
  });  

  Deps.autorun(function () {
    var bkToBeSaved = Session.get("saveBk");
    if(bkToBeSaved){
      // console.log("Saving bookmark...");
      // console.log(bkToBeSaved);
      Bookmarks.insert(bkToBeSaved, function(){
        // console.log("Bookmark saved in the DB");
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //clean the repository
    // Bookmarks.remove({});
  });
}

/** @jsx React.DOM */

Bookmarks = new Meteor.Collection("bookmarks");

if (Meteor.isClient) {
  Meteor.startup(function() {
    //Init some view components with datas
    Session.set("data", data13);//init table
    Session.set("connectionState", {connectionState: "label-default", connectionInfo: "Not connected"});//init table
    // Session.set("bks", [{name: "connard", mdx: "ddd", _id: "0"}]);//init bk tree

    //Build the view
    React.renderComponent(
      <Main title={".title."}/>,
      document.getElementById('main')
      );
  });

  Deps.autorun(function () {
    var bks = Bookmarks.find().fetch();
    if (bks){
      Session.set("bks", bks);
      console.log("Bks have been updated");       
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //clean the repository
    // Bookmarks.remove({});
  });
}

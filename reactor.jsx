/** @jsx React.DOM */

if (Meteor.isClient) {
  Meteor.startup(function() {
  	Session.set("data", data13);
    main = React.renderComponent(
      <Main title={".title."}/>,
      document.getElementById('main')
      );
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  // code to run on server at startup
  });
}

/** @jsx React.DOM */

BookmarksHolder = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function() {
    return {
      bks: Session.get("bks")
    }
  },
  clickHandler : function(bk){
    // console.log("Name: "+bk.name+" mdx: "+bk.mdx);
    createWebSocket(bk.mdx);
  },
	render: function () {
    var self = this;
		return (
      <div className="list-group">
      {this.state.bks.map(function(bk){
          return(
              <a href="#" className="list-group-item" onClick={self.clickHandler.bind(self, bk)}>{bk._id}</a>
            );
        })}
      </div>
      ); 
	}
});

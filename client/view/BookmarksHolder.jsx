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
    MainWebSocket.getInstance(bk.mdx).run();
  },
	render: function () {
    var self = this;
		return (
      <div className="list-group bookmarks-list">
      {this.state.bks.map(function(bk){
          return(
              <a href="#" className="list-group-item" onClick={self.clickHandler.bind(self, bk)} key={bk._id}>{bk.name}</a>
            );
        })}
      </div>
      ); 
	}
});

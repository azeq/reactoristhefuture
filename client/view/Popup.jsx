/** @jsx React.DOM */

//Modal
Content = React.createClass({
  	render: function () {
	    return (
			<div className="input-group">
			  <span className="input-group-addon">Name</span>
			  <input type="text" className="form-control" placeholder="Name" />
			</div>
    	);
  	}
});

//Modal
Popup = React.createClass({
  	render: function () {
	    return (
			<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			        <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
			      </div>
			      <div className="modal-body">
			        	<Content/>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			        <ReqButton title={"Save"} className={"btn btn-primary"} onclickHandler={this.props.onOkHandler}/>
			      </div>
			    </div>
			  </div>
			</div>
    	);
  	}
});


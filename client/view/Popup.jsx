/** @jsx React.DOM */

//Modal
PopUpContent = React.createClass({
	onchangeHandler: function(evt){
		this.props.callback(evt.target.value);
	},
  	render: function () {
	    return (
			<div className="input-group">
			  <span className="input-group-addon">Name</span>
			  <input type="text" className="form-control" placeholder="Name" onChange={this.onchangeHandler}/>
			</div>
    	);
  	}
});

//Modal
Popup = React.createClass({
	getName: function(name){
		this.bookmarkName = name;//record the name on onchange event
	},
	save: function(){
		this.props.onsaveHandler(this.bookmarkName);//callback
	},
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
			        	<PopUpContent callback={this.getName}/>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			        <ReqButtonModal title="Save" className="btn btn-primary" onclickHandler={this.save}/>
			      </div>
			    </div>
			  </div>
			</div>
    	);
  	}
});


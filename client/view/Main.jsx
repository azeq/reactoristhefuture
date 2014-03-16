/** @jsx React.DOM */

var Left = React.createClass({
	render: function () {
		return (
			<div className="col-md-3">
				<ul className="nav nav-tabs">
					<li className="active"><a href="#wiz" data-toggle="tab">Wizard</a></li>
					<li><a href="#bookmarks" data-toggle="tab">Bookmarks</a></li>
				</ul>
				<div className="tab-content">
					<div className="tab-pane active" id="wiz">
	                	<Wizard/>
	               	</div>
	                <div className="tab-pane" id="bookmarks">
	                	<BookmarksHolder/>
	                </div>
	            </div>
            </div>
        );
	}
});

var Right = React.createClass({
	render: function () {
		return (
			<div className="col-md-9">
	            <Table/>
	        </div>
        );
	}
});

searchBar = new SearchBar(cube);//there is no interest to do that...
//<Search cubeDescription={new CubeDescription(cube)}/>

//Uncomment to draw only table
// Main = React.createClass({
// 	render: function () {
// 		return (
// 			<div>
// 				<div className="container-fluid" id="main">
// 						<Right/>
// 	            </div>
//             </div>
//         );
// 	}
// });

Main = React.createClass({
	render: function () {
		return (
			<div>
				{searchBar.render()}
				<div className="container-fluid" id="main">
					<div className="row">
						<Left/>
						<Right/>
		            </div>
	            </div>
            </div>
        );
	}
});

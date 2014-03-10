search_data = [
	"Bookings",
	"Time",
	"Underlyings",
	"Products",
	"TimeBucket",
	"BookId",
	"Desk"
];

cube = 
{
	"dimensions" : {
		"dimensions" : 
		[
			{
				"name" : "Bookings",
				"type" : "dimension",
				"hierarchies" : [ 
						{ "name" : "Desk", "type" : "hierarchy", "levels" : [ { "name" : "Desk", "type" : "level" }, { "name" : "BookId", "type" : "level" } ] },
						{ "name" : "Status", "type" : "hierarchy", "levels" : [ { "name" : "IsSimulated", "type" : "level" }, { "name" : "Status", "type" : "level" } ] }
					] 
			},
			{
				"name" : "HostName",
				"type" : "dimension",
				"hierarchies" : [ 
						{ "name" : "HostName", "type" : "hierarchy", "levels" : [ { "name" : "HostName", "type" : "level" } ] }
					] 
			},
			{
				"name" : "Time",
				"type" : "dimension",
				"hierarchies" : [ 
						{ "name" : "HistoricalDates", "type" : "hierarchy", "levels" : [ { "name" : "AsOfDate", "type" : "level" } ] },
						{ "name" : "TimeBucket", "type" : "hierarchy", "levels" : [ { "name" : "DateBucket", "type" : "level" }, { "name" : "ValueDate", "type" : "level" } ] },
						{ "name" : "TimeBucketDynamic", "type" : "hierarchy", "levels" : [ { "name" : "TimeBucketDynamic", "type" : "level" } ] }
					] 
			},
			{
				"name" : "Underlyings",
				"type" : "dimension",
				"hierarchies" : [ 
						{ "name" : "Products", "type" : "hierarchy", "levels" : [ { "name" : "ProductType", "type" : "level" }, { "name" : "ProductName", "type" : "level" } ] },
						{ "name" : "Underlyings", "type" : "hierarchy", "levels" : [ { "name" : "UnderlierCurrency", "type" : "level" }, { "name" : "UnderlierType", "type" : "level" }, { "name" : "UnderlierCode", "type" : "level" } ] }
					] 
			}
		] 
	},
	"measures" : [ 
		{ "name" : "pnl.SUM" , "type" : "measure" }, 
		{ "name" : "contributors.COUNT", "type" : "measure" },
		{ "name" : "delta.SUM", "type" : "measure" },
		{ "name" : "pnl.FOREX", "type" : "measure" },
		{ "name" : "gamma.SUM", "type" : "measure" }
	]
};
// console.log(cube);

typeToSubType = { "dimension" : "hierarchies", "hierarchy" : "levels"};

//flatten item and turn it into an array {name, type}
//item is a json olap entity
function flatImpl(item, tab){
	for(var key in item){
		if(item.hasOwnProperty(key) && key != "type"){
			if(item[key] instanceof Array){
				item[key].map(function(a){
					flatImpl(a, tab);
				});
			}else if(key == "name"){
				tab.push({ "name" : item["name"], "type" : item["type"] });
			}else{
				flatImpl(item[key], tab);
			}
		}
	}
	return tab;
}

function retrieveItemImpl(item, itemName, itemType, res){
	for(var key in item){
		if(item.hasOwnProperty(key)){
			if(item[key] instanceof Array){
				item[key].map(function(a){
					retrieveItemImpl(a, itemName, itemType, res);
				});
			}else if(key == "name" || key == "type"){
				if(item[key] == itemName)
					res.push(item[itemType]);
			}else{
				retrieveItemImpl(item[key], itemName, itemType, res);
			}
		}
	}
	return res;
}

retrieveItem = function retrieveItem(item, itemName, itemType){
	return retrieveItemImpl(item, itemName, itemType, []);
}

flat = function flat(item){
	return flatImpl(item, []);
}

// console.log(retrieveItem(cube, "Bookings", "hierarchies"));//get all below this dim
// console.log(retrieveItem(cube, "HistoricalDates", "levels"));//get all below this hier
// console.log(flat(cube));
// console.log(flat(cube.dimensions.dimensions[0]));//only the elements of "Bookings"

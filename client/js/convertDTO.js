
//Give the max length among members of the same hierarchy
//size of the array is the size of the positions array
function maxLengthPath(axis){
	var positions = axis.positions;
	var nPos = positions.length;
	var maxArray = [];
	var nMem = positions[0].members.length;
	for(var k = 0; k<nMem; k += 1){
		var max = 0;
		for(var j = 0; j<nPos; j += 1){
			var member = positions[j].members[k];
			var pathLength = member.path.path.length;
			if(member.path.path[0] == "AllMember"){
				pathLength -= 1;
			}
			if(max < pathLength){
				max = pathLength;   
			}
		}
		maxArray.push(max);
	}
	return maxArray;
}

var total = "";//Total "; //not now
convert = function convert(cellSetDtoInit){
	var cellSetDto = JSON.parse(JSON.stringify(cellSetDtoInit));//create a copy of the object
	var n = cellSetDto.axes.length;
	for(var i = 0; i<n; i += 1){
	    var axis = cellSetDto.axes[i];
	    var max = maxLengthPath(axis);
	    // console.log(max);
		var positions = axis.positions;
		var nPos = positions.length;
		for(var j = 0; j<nPos; j += 1){
			var members = positions[j].members;
			var nMem = members.length;
			var dispNameTotal = null;
			for(var k = 0; k<nMem; k += 1){
			     var member = members[k];
			     var path = member.path.path;

			     //first condition to avoid AllMember member
			     if(member.path.path.length > 1 && k+1 < nMem && members[k+1].levelName == "ALL"){
			     	dispNameTotal = member.displayName;
			     	member.displayName = total+dispNameTotal;
			     }else if(dispNameTotal != null && member.levelName == "ALL"){
			     	member.displayName = total+dispNameTotal;
			     }

			     if(path.length > 2){
			         //it's a drilldown, need to cut
			         for(var l = 1; l<path.length-1; l +=1){
			             members.splice(k, 0, {"displayName":path[l]});
			         }
			     }
			     else{
			         for(var l = 0; l<max[k]-1; l +=1){
			             members.splice(k, 0, {"displayName":member.displayName});
			         }
			     }
			}
		}
	}
	return cellSetDto;//return the new modified cell set
}

replaceNewCells = function replaceNewCells(data, newCells){
	for(var i = 0; i < newCells.length; i += 1){
		var currentOrdinal = newCells[i].ordinal;
		for(var k = 0; k < data.cells.length; k += 1)
			if(data.cells[k].ordinal == currentOrdinal){
				data.cells[k] = newCells[i];
				break;
			}
	}
}

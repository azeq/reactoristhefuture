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

var debug = false;
var total = debug ? "**" : "";//Total "; //not now
var cutPath = debug ? "^" : "";
var dealAllMem = debug ? "$": "";
var lastAllMem = debug ? "€": "";
var drill1 = debug ? "000" : "";//Equivalent to cut, so ^ equal to this 
var drill2 = debug ? "---" : "";//Equivalent to cut, so ^ equal to this
var drill3 = debug ? ";;;" : "";//Equivalent to cut, so ^ equal to this

convert = function convert(cellSetDtoInit){
	print(cellSetDtoInit);
	var cellSetDtoRef = JSON.parse(JSON.stringify(cellSetDtoInit));//create a copy of the object
	var cellSetDto = JSON.parse(JSON.stringify(cellSetDtoInit));//create an other copy of the object
	var n = cellSetDtoRef.axes.length;
	for(var i = 0; i<n; i += 1){
	    var axis = cellSetDtoRef.axes[i];
	    var max = maxLengthPath(axis);//for a given axis, array of the max size of member path, ex [1, 1, 2]
	    // print(max);
		var positions = axis.positions;
		var nPos = positions.length;
		for(var j = 0; j<nPos; j += 1){
			var members = positions[j].members;
			var nMem = members.length;
			var dispNameTotal = null;
			var newPath = null;
			for(var k = 0; k<nMem; k += 1){
				var member = members[k];
				var path = member.path.path;

				var memberDisplayName = member.displayName;

				var shi = shift(max, k);//take this index since the index k doesn't mean anythin
				//a shift could be occurred previously

				//add a attribute, default value
				cellSetDto.axes[i].positions[j].members[shi].isTotal = false;

				var isADd = false;
				//check if it is a drilldown
				if(j+1 < nPos){
					isADd = isADrilldown(member, positions[j+1].members[k]);
				} 
				
				//first condition to avoid AllMember member
				if(member.path.path.length > 1 && k+1 < nMem && members[k+1].levelName == "ALL"){
					//if the next member has ALL for level, then it is a total
					dispNameTotal = member.displayName;//save dispNameTotal
					memberDisplayName = total+dispNameTotal;
					cellSetDto.axes[i].positions[j].members[shi].displayName = memberDisplayName; 
					cellSetDto.axes[i].positions[j].members[shi].isTotal = true;
					cellSetDto.axes[i].positions[j].members[shi].isADrilldown = isADd;
					if(isADd)
						memberDisplayName = drill3+memberDisplayName;
					newPath = path.slice(0);//copy path
				} else if(dispNameTotal != null && member.levelName == "ALL"){
					//for the last member of a position
					memberDisplayName = total+dispNameTotal;
					cellSetDto.axes[i].positions[j].members[shi].isTotal = true;
					cellSetDto.axes[i].positions[j].members[shi].isADrilldown = isADd;
					if(isADd)
						memberDisplayName = drill3+memberDisplayName;
				}

				//add HERE additional members (only for the rendering)
				// print("pos="+j+"  **  k="+k+"; "+path);
				var s = computeIndexOfInsertion(max, k);
				var isTotal = cellSetDto.axes[i].positions[j].members[shi].isTotal;//store value before cutting...
				if(path.length > 2){
				 	//it's a drilldown, need to cut
					for(var l = 1; l<path.length-1; l +=1){
				 		// print("pos="+j+"  **  k="+k+";s="+s+";l="+l+"  **  "+(s-1+k+l)+"  **  "+path[l]+ "  **  "+path);
				 		cellSetDto.axes[i].positions[j].members.splice(s+l-1, 0, {"displayName":cutPath+path[l]});
				 		cellSetDto.axes[i].positions[j].members[s+l-1].path = {};
						cellSetDto.axes[i].positions[j].members[s+l-1].path.path = path.slice(0, l+1);// the last element is exclude
						cellSetDto.axes[i].positions[j].members[s+l-1].isTotal = false;
						cellSetDto.axes[i].positions[j].members[s+l-1].isADrilldown = false;
				 	}
				} else{
					//deals AllMember only
					for(var l = 0; l<max[k]-1; l +=1){
						// print("pos="+j+"  **  k="+k+";s="+s+";l="+l+"  **  "+(s)+"  **  "+path[l]+ "  **  "+path);
						cellSetDto.axes[i].positions[j].members.splice(s+l, 0, {"displayName":dealAllMem+memberDisplayName});
						cellSetDto.axes[i].positions[j].members[s+l].path = {};// = path;
						cellSetDto.axes[i].positions[j].members[s+l].path.path = newPath != null ? newPath.slice(0) : path.slice(0);//copy the path of the member
						cellSetDto.axes[i].positions[j].members[s+l].isTotal = isTotal;
						cellSetDto.axes[i].positions[j].members[s+l].isADrilldown = isADd;
						if(isADd)
							cellSetDto.axes[i].positions[j].members[s+l].displayName = drill2+cellSetDto.axes[i].positions[j].members[s+l].displayName;
					}
					cellSetDto.axes[i].positions[j].members[s+max[k]-1].displayName = lastAllMem+memberDisplayName;
					cellSetDto.axes[i].positions[j].members[s+max[k]-1].path = {};// = path;
					cellSetDto.axes[i].positions[j].members[s+max[k]-1].path.path = newPath != null ? newPath.slice(0) : path.slice(0);//copy the path of the member
					cellSetDto.axes[i].positions[j].members[s+max[k]-1].isTotal = isTotal;
					cellSetDto.axes[i].positions[j].members[s+max[k]-1].isADrilldown = isADd;
					if(isADd)
						cellSetDto.axes[i].positions[j].members[s+max[k]-1].displayName = drill1+cellSetDto.axes[i].positions[j].members[s+max[k]-1].displayName;
				}
			}
		}
	}
	print(cellSetDto.axes[0]);
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

function isADrilldown(member, memberOnNextPos){
	var path = member.path.path;
	var nextPath = memberOnNextPos.path.path;
	var n = path.length;
	if(nextPath.length-n == 1 && n > 1){
		var a = true;
		for(var i = 0; i<n; i +=1){
			a = a && path[i] == nextPath[i];//compare all elements of the path one by one
			//print(path[i]+ "  **  "+nextPath[i]);
		}
		return a;
	}
	return false;
}

function computeIndexOfInsertion(max, k){
	var s = 0;
	if(k>=1){
		for(var i = 0; i < k; i += 1){
			s += max[i];
		}
	}
	return s;
}

function shift(max, k){
	return computeIndexOfInsertion(max, k);
}

function print(a){
	if(debug)
		console.log(a);
}

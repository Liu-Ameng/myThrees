//Utility

//Model
function GridMap(row, col) {
    this.row = row;
    this.col = col;
    var grid = new Array(row);
    for(var i=0;i<row;++i) {
	grid[i] = new Array(col);
	for(var j=0;j<col;++j)
	    grid[i][j] = 0;
    }
    grid[1][1] = 1;
    grid[2][2] = 2;
    this.getCell = function(r, c) {
	try {
	    if(grid[r][c] == 0)
		return "";
	    return grid[r][c];
	}catch(e) {
	    return null;
	}
    }
    this.moveAllCell = function(direction){
	/*流程：
	 * 为空移动，1、2合3，相同乘2
	 * 触发 随机加数（1、2、3、6.。。）
	 * 触发 分数计算(?)
	 */
	if(direction == "up"){
	    for(var i=1;i<row;++i){
		for(var j=0;j<col;++j){
		    if(grid[i-1][j]==0){
			grid[i-1][j]=grid[i][j];
			grid[i][j]=0;
		    }else if( (grid[i-1][j]==1 && grid[i][j]==2)
			    || (grid[i-1][j]==2 && grid[i][j]==1)
			    || (grid[i-1][j]==grid[i][j] && grid[i][j]!=1 && grid[i][j]!=2)){
			grid[i-1][j] += grid[i][j];
			grid[i][j]=0;
		    }
		}
	    }
	} else if(direction == "down"){
	    for(var i=row-2;i>=0;--i){
		for(var j=0;j<col;++j){
		    if(grid[i+1][j]==0){
			grid[i+1][j]=grid[i][j];
			grid[i][j]=0;
		    }else if( (grid[i+1][j]==1 && grid[i][j]==2)
			    || (grid[i+1][j]==2 && grid[i][j]==1)
			    || (grid[i+1][j]==grid[i][j] && grid[i][j]!=1 && grid[i][j]!=2)){
			grid[i+1][j] += grid[i][j];
			grid[i][j]=0;
		    }
		}
	    }
	} else if(direction == "left"){
	    for(var i=0;i<row;++i){
		for(var j=1;j<col;++j){
		    if(grid[i][j-1]==0){
			grid[i][j-1]=grid[i][j];
			grid[i][j]=0;
		    }else if( (grid[i][j-1]==1 && grid[i][j]==2)
			    || (grid[i][j-1]==2 && grid[i][j]==1)
			    || (grid[i][j-1]==grid[i][j] && grid[i][j]!=1 && grid[i][j]!=2)){
			grid[i][j-1] += grid[i][j];
			grid[i][j]=0;
		    }
		}
	    }
	} else if(direction == "right"){
	    for(var i=0;i<row;++i){
		for(var j=col-2;j>=0;--j){
		    if(grid[i][j+1]==0){
			grid[i][j+1]=grid[i][j];
			grid[i][j]=0;
		    }else if( (grid[i][j+1]==1 && grid[i][j]==2)
			    || (grid[i][j+1]==2 && grid[i][j]==1)
			    || (grid[i][j+1]==grid[i][j] && grid[i][j]!=1 && grid[i][j]!=2)){
			grid[i][j+1] += grid[i][j];
			grid[i][j]=0;
		    }
		}
	    }
	}
	if(randAddNumber()==false){
	    alert("Game Over");
	    $("#t_score").text(this.getScore());
	}
	updateGrid();	      
    }//end function moveAllCell

    function randAddNumber(){
	var id = Math.floor(Math.random()*row*col);
	var possibility = new Array(0.4,0.4,0.15,0.05,1);
	var numSet =      new Array(  1,  2,   3,   6,12);
	var num = 1;
	var r = Math.random();
	for(var i=0;i<5;++i){
	    r -= possibility[i];
	    if(r<=0) {
		num = numSet[i];
		break;
	    }
	}
	while(true){
	    var isFull = true;
	    for(var i=0;i<row;++i){
		for(var j=0;j<col;++j){
		    if(grid[i][j]==0){
			id--;
		       isFull = false;	
		    }
		    if(id<0){
			grid[i][j]=num;
			return true;
		    }
		}
	    }
	    if(isFull == true)
		return false;
	}
    }//end randomAddNumber()

    this.getScore = function() {
	score = 0;
	for(i=0;i<row;++i){
	    for(j=0;j<row;++j){
		score += grid[i][j];
	    }
	}
	return score;	
    }//end this.getScore
}//end GridMap
var gridMap = new GridMap(4, 4);

//Control
function getTableCell(r, c) {
    var s = "#main tr:eq("+r+") td:eq("+c+")";
    return $(s);
}
function updateGrid() {
    for(var i=0;i<gridMap.row;++i) {
	for(var j=0;j<gridMap.col;++j) {
	    getTableCell(i,j).text(gridMap.getCell(i,j));
	}	
    }
}

$(document).ready( function(){
    gridMap = new GridMap(4, 4);
    updateGrid();
    $("#b_up").click( function(){gridMap.moveAllCell("up");});
    $("#b_down").click( function(){gridMap.moveAllCell("down");});
    $("#b_left").click( function(){gridMap.moveAllCell("left");});
    $("#b_right").click( function(){gridMap.moveAllCell("right");});

    $(document).keyup( function(event){
	if(event.keyCode  == 38)
	    gridMap.moveAllCell("up");
	else if(event.keyCode  == 40)
	    gridMap.moveAllCell("down");
	else if(event.keyCode  == 37)
	    gridMap.moveAllCell("left");
	else if(event.keyCode  == 39)
	    gridMap.moveAllCell("right");
    });
});

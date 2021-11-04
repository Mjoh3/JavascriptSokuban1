var tbl;
var mymessage;
function tableCreate() {
  const body = document.body;
  tbl = document.createElement('table');
  
  tbl.style.border = '1px solid black';

  for (let i = 0; i < tileMap01.height; i++) {
    tr = tbl.insertRow();
    for (let j = 0; j < tileMap01.width; j++) {
      
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(`${tileMap01.mapGrid[i][j][0]}`));
		
        
    }
  }
  body.appendChild(tbl);
  
  mymessage= document.createElement('P');
  body.appendChild(mymessage);
  
  mymessage.innerHTML='Please complete the game';
  document.addEventListener("keyup", keyEvent, false);
  
  refreshbutton= document.createElement('button');
  
  body.appendChild(refreshbutton);
  refreshbutton.innerHTML='Reset';
  refreshbutton.addEventListener("click", refreshPage);
  UpdateGraphics();
  window.addEventListener("keydown", function(e) {
		if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);
}
function refreshPage(){
    window.location.reload();
}
function keyEvent(e) {
  var keyCode = e.keyCode;
  
  if(keyCode==40) {
	 
	if(canMove(0,1)){  
	  moveBifPushed(0,1);
	  moveP(0,1);
	}
  } 
  else if(keyCode==38){
	  
	if(canMove(0,-1)){  
	  moveBifPushed(0,-1);
	  moveP(0,-1);
	}
  }
  else if(keyCode==37){
	  
	if(canMove(-1,0)){  
	  moveBifPushed(-1,0);
	  moveP(-1,0);
	}
   
  }
  else if(keyCode==39){
	  
	if(canMove(1,0)){  
	  moveBifPushed(1,0);
	  moveP(1,0);
	}
  }
  
}
function refillG(){
	for (let i = 0; i < tileMap01.height; i++) {
    for (let j = 0; j < tileMap01.width; j++) {        
        if(tileMap01.mapGrid[i][j][0]=='G' && tbl.rows[i].cells[j].innerHTML==''){
			tbl.rows[i].cells[j].innerHTML='G';
		}     
    }
  }
}
function moveP(x,y){
	if(y>0){
		for (let i = tileMap01.height-1; i >=0; i--) {    
			for (let j = 0; j < tileMap01.width; j++) {
				if(tbl.rows[i].cells[j].innerHTML=='P' && tbl.rows[i+y].cells[j+x].innerHTML!='B'){
					tbl.rows[i+y].cells[j+x].innerHTML='P';
					tbl.rows[i].cells[j].innerHTML='';
					break;
				}
			}
		}
	}
	else{
		for (let i = 0; i <tileMap01.height; i++) {    
			for (let j = 0; j < tileMap01.width; j++) {
				if(tbl.rows[i].cells[j].innerHTML=='P' && tbl.rows[i+y].cells[j+x].innerHTML!='B'){
					tbl.rows[i+y].cells[j+x].innerHTML='P';
					tbl.rows[i].cells[j].innerHTML='';
					break;
				}
			}
		}
	}
	refillG();
	UpdateGraphics();
	if(UserHasCompletedGame()){
		mymessage.style.color='green';
		mymessage.innerHTML='You have completed the game, congratulations';
	}
	else{
		mymessage.style.color='black';
		mymessage.innerHTML='Please complete the game';
	}
}
function moveBifPushed(x,y){
	if(y>0){
		for (let i = tileMap01.height-1; i >=0; i--) {    
			for (let j = 0; j < tileMap01.width; j++) {
				if(tbl.rows[i].cells[j].innerHTML=='P' && tbl.rows[i+y].cells[j+x].innerHTML=='B'){
					tbl.rows[i+y+y].cells[j+x+x].innerHTML='B';
					tbl.rows[i+y].cells[j+x].innerHTML='';
					break;
				}
			}
		}
	}
	else{
		for (let i = 0; i <tileMap01.height; i++) {    
			for (let j = 0; j < tileMap01.width; j++) {
				if(tbl.rows[i].cells[j].innerHTML=='P' && tbl.rows[i+y].cells[j+x].innerHTML=='B'){
					tbl.rows[i+y+y].cells[j+x+x].innerHTML='B';
					tbl.rows[i+y].cells[j+x].innerHTML='';
					break;
				}
			}
		}
	}
}


function canMove(x,y){
	
	if(GetCellFromP(x,y)=='B' && GetCellFromP(x+x,y+y)=='B'){
		return false;
	}
	else if(GetCellFromP(x,y)=='B' && GetCellFromP(x+x,y+y)=='W'){
		return false;
	}
	else if(GetCellFromP(x,y)=='W'){
		return false;
	}
	else if(UserHasCompletedGame()){
		return false;
	}
	else{
		return true;
	}
}

function GetCellFromP(x,y){
	if(y>0){
		for (let i = tileMap01.height-1; i >=0; i--) {    
			for (let j = 0; j < tileMap01.width; j++) {
				if(tbl.rows[i].cells[j].innerHTML=='P'){
					return tbl.rows[i+y].cells[j+x].innerHTML;
				}
			}
		}
	}
	else{
		for (let i = 0; i <tileMap01.height; i++) {    
			for (let j = 0; j < tileMap01.width; j++) {
				if(tbl.rows[i].cells[j].innerHTML=='P'){
					return tbl.rows[i+y].cells[j+x].innerHTML;
				}
			}
		}
	}
	return null;
}
function UserHasCompletedGame(){
	for (let i = 0; i < tileMap01.height; i++) {
    for (let j = 0; j < tileMap01.width; j++) {        
        if(tileMap01.mapGrid[i][j][0]=='G' && tbl.rows[i].cells[j].innerHTML!='B'){
						
			return false;
		}     
    }}
	return true;
}
function UpdateGraphics(){
	for (let i = 0; i < tileMap01.height; i++) {
    for (let j = 0; j < tileMap01.width; j++) {        
        switch(tbl.rows[i].cells[j].innerHTML){
			case 'P':
				tbl.rows[i].cells[j].style.cssText=MyStyles[Entities.Character];
				break;
			case 'W':
				tbl.rows[i].cells[j].style.cssText=MyStyles[Tiles.Wall];
				break;
			case 'B':
				if(tileMap01.mapGrid[i][j][0]=='G'){
					tbl.rows[i].cells[j].style.cssText=MyStyles[Entities.BlockDone];
				}
				else{
					tbl.rows[i].cells[j].style.cssText=MyStyles[Entities.Block];
				}
				break;
			case 'G':
				tbl.rows[i].cells[j].style.cssText=MyStyles[Tiles.Goal];
				break;
			case '':
				tbl.rows[i].cells[j].style.cssText=MyStyles[Tiles.Space];
				break;
			default:
				break;
		}
		
		
    }
	}
}

var MyStyles={
	"tile-wall": "background-color: brown; ",
	"tile-space": "background-color: white;", 
	"tile-goal": "background-color: grey;", 
	"entity-player": "background-color: blue;",
	"entity-block": "background-color: orange;",
	"entity-block-goal": "background-color: green;"	
}
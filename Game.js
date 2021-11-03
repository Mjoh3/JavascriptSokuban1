var tbl;
var mymessage;
function tableCreate() {
  const body = document.body;
  tbl = document.createElement('table');
  tbl.style.width = '100px';
  tbl.style.border = '1px solid black';

  for (let i = 0; i < tileMap01.height; i++) {
    tr = tbl.insertRow();
    for (let j = 0; j < tileMap01.width; j++) {
      
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(`${tileMap01.mapGrid[i][j][0]}`));
		
        td.style.border = '1px solid black';
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
  document.addEventListener("click", refreshPage);
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
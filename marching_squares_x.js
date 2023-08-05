const cc = {"0000":"",  "0001":"341",  "0002":"",  "0010":"145",  "0011":"35",  "0012":"05",  "0020":"",  "0021":"23",  "0022":"",  "0100":"347",  "0101":"71",  "0102":"07",  "0110":"35417",  "0111":"745",  "0112":"75",  "0120":"37",  "0121":"27",  "0122":"047",  "0200":"",  "0201":"61",  "0202":"",  "0210":"15",  "0211":"65",  "0212":"045",  "0220":"",  "0221":"62",  "0222":"",  "1000":"745",  "1001":"35417",  "1002":"75",  "1010":"71",  "1011":"347",  "1012":"07",  "1020":"27",  "1021":"73",  "1022":"27",  "1100":"35",  "1101":"145",  "1102":"05",  "1110":"341",  "1111":"",  "1112":"",  "1120":"23",  "1121":"",  "1122":"02",  "1200":"65",  "1201":"15",  "1202":"65",  "1210":"61",  "1211":"",  "1212":"60",  "1220":"62",  "1221":"62",  "1222":"62",  "2000":"",  "2001":"31",  "2002":"",  "2010":"81",  "2011":"83",  "2012":"08",  "2020":"",  "2021":"23",  "2022":"",  "2100":"83",  "2101":"81",  "2102":"08",  "2110":"31",  "2111":"",  "2112":"08",  "2120":"843",  "2121":"28",  "2122":"08",  "2200":"",  "2201":"641",  "2202":"",  "2210":"841",  "2211":"68",  "2212":"08",  "2220":"",  "2221":"62",  "2222":""};

let field = [];
let rez = 6;
let cols, rows;
let increment = 0.08;
let zoff = 0;

function setup() {
  createCanvas(400, 400);
  //noise = new OpenSimplexNoise(Date.now());
  cols = 1 + width / rez;
  rows = 1 + height / rez;
  for (let i = 0; i < cols; i++) {
    let k = [];
    let h = [];
    for (let j = 0; j < rows; j++) {
      k.push(0);
      h.push(0);
    }
    moused.push(h);
    field.push(k);
  }
}

let tres1 = 0.5;
let tres2 = 0.493;

function type(a){
  if(a < tres1){
    if(a < tres2){
      return 0;
    }else{
      return 2;
    }
  }else{
    return 1;
  }
}

function dl(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}


function isHalf(p){
  return type(p)==2;
}

mouseDragged = mouseClicked = mouse;

function mouse(){
  mx = int(mouseX/rez);
  my = int(mouseY/rez);
  if(mouseButton == RIGHT)
    setAdj(mx,my,int(drawSize),1);
  else if(mouseButton == LEFT)
    setAdj(mx,my,int(drawSize),2);
}

function setAdj(x,y,s,v){
  if(s < 2){
    moused[x][y] = v;
    return;
  }
  for(var i = x;i<x+s;i++){
    for(var j = y;j<y+s;j++){
      try{moused[i][j] = v;}
      catch{}
    }
  }
}

let moused = [];

function draw() {
  background(0);
  let xoff = 0;
  for (let i = 0; i < cols; i++) {
    xoff += increment;
    let yoff = 0;
    for (let j = 0; j < rows; j++) {
      if(moused[i][j] == 0)
        field[i][j] = float(noise(xoff, yoff, zoff));
      else if(moused[i][j] == 1)
        field[i][j] = 0.7;
      else if(moused[i][j] == 2)
        field[i][j] = 0;
      yoff += increment;
    }
  }
  zoff += 0.01;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
     fill(field[i][j]*255);
      noStroke();
     rect(i*rez, j*rez, rez, rez);
   }
  }
  strokeWeight(rez/5);
  stroke(255,0,0);
  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {
      let x = i * rez;
      let y = j * rez;   
      let a = createVector(x + rez * 0.5, y);
      let b = createVector(x + rez, y + rez * 0.5);
      let c = createVector(x + rez * 0.5, y + rez);
      let d = createVector(x, y + rez * 0.5);
      let cen = createVector(x + rez *0.5, y+rez*0.5);
      let cc1 = createVector(x,y);
      let cc2 = createVector(x+rez,y);
      let cc3 = createVector(x+rez,y+rez);
      let cc4 = createVector(x,y+rez);
      let c1 = field[i][j];
      let c2 = field[i + 1][j];
      let c3 = field[i + 1][j + 1];
      let c4 = field[i][j + 1];
      let state=getState(type(c2),type(c1),type(c3),type(c4));
      /* 
      c4 - c - c3
      |         |
      d   cen   b
      |         |
      c1 - a - c2
      */
      let k = cc[state];
      let pp = [cc4, c, cc3, d, cen, b, cc1, a, cc2];
      if(k.length <= 1) continue;
      for(let h = 0;h<k.length-1;h++){
        dl(pp[int(k[h])],pp[int(k[h+1])]);
      }
    }
  }
}

let drawSize = 1;

function mouseWheel(event){
  drawSize += event.delta/500;
}

function getState(a, b, c, d) {
  return str(a)+str(b)+str(c)+str(d);
}

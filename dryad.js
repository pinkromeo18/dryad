/* usage
import {dryad,get,reg} from "https://pinkromeo18.github.io/dryad/dryad.js"
var re,fn;
reg({re,fn})

await dryad.run(temp)
*/

var dryad={run,next,done,isend,init,parse}

async function run(str){
  var o= get();
  const {init,done,parse} = o
  init()
  o.lines = parse(str)
  await done()
}

function init(){
  var o=get()
  o.fns = o.fns||[]
  o.flgs = o.flgs||{}
  //
  o.tick=0
  o.jumpback=99999
  o.lines=[]
  //
  o.$=void 0
  o.$0=void 0
  o.$1=void 0
  o.$2=void 0
  o.$3=void 0
  o.$4=void 0
  o.$5=void 0
  o.$6=void 0
  o.$7=void 0
  o.$8=void 0
  o.$9=void 0  
}

function isend(){
  const {tick,lines} = get()
  return !(tick<lines.length)
}

function next(num){
  var o=get()  
  if(isnumber(num)) o.tick = num
  else o.tick++
  return
  ;
  function isnumber(value) {
    return Number.isFinite(value);
  };    
}

async function done(){
  const {isend} = get()
  if(isend())return;
  const {fns,tick,lines,next,done} = get(),        
        dummy={fn:()=>next()},
        line = lines[tick],
        num = fns.findIndex(d=>d.re.test(line)),
        {fn} = (num===-1)?dummy:fns[num]//  
  isasync(fn)?await fn(line):fn(line)  
  return await done()
  ;
  function isasync(func) {
    return func.constructor.name === "AsyncFunction";
  }
}

function parse(str){  
  return str.split('\n').map(capture).filter(commentcut)
  ;
  function capture(d,i,a){
    var re=/^-{3,}/,cep='\n'
    if(!re.test(d))return d
    var wk=d+cep,line=''
    for(i++;i<a.length;i++){
      line=a[i],wk+=line+cep,a[i]=''
      if(re.test(line))return wk.trim()
    }
  }
  function commentcut(d){
    d=d.trim()
    var re=/^\/\//
    return (d && !re.test(d)) 
  }
}

//---------------
dryad.init()
export {dryad}
export function get(){return dryad;}
export function reg({re,fn}){
  var {fns} = get()
  fns.push({re,fn})
}
//----------------


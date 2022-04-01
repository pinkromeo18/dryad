import {get,reg} from "https://pinkromeo18.github.io/dryad/dryad.js"

function mark(line){
  const {next}=get()
  next();
}

function _eval(line){
  //return eval
  if(!window.dryad) window.dryad = get()
  const mac = `with(dryad){ return ${line} }`
  return Function(mac)();  
}

async function async_eval(line){
  //no return !!
  line = strip(line)
  if(!window.dryad) window.dryad = get()
  const {next} = get(),
        mac = `return async()=>{ with(dryad){ ${line} } }`,
        func = Function(mac)()
  await func()
  next();
}

function strip(line){
  var re=/^-{3,}/,cep='\n'
  return line.split(cep).filter(d=>!re.test(d)).join(cep)
}

function multi(line){
  line = strip(line)
  var o=get()
  const {next}=o
  o.$=line
  next()
}

function flg(line){
  //%data 
  //%data 0
  const re_del =/ 0/,cep=' '
  const {next} = get()
  var {flgs} = get()
  line = line.replace('%','').replace('0','').trim()
  
  if(re_del.test(line)) delete flgs[line] //<--------------------
  else flgs[line] = 1
  next();
}

function jump(line){
  //>>> #aaa
  //>>> ###aaa
  //>>> flg >>> #aaa
  //>>> flg >>> ###aaa
  var o=get()
  const {next,lines,jumpback,tick,flgs}=o
  const {flg,addr,issub,justsub} = calc_jump(line)
  if(!flg) return next()
  if(justsub) return next(jumpback)
  const num=lines.findIndex(d=>d===addr)  
  if(num===-1) return next()
  if(issub) o.jumpback = tick + 1 //
  return next(num) 
  ;
}

function _if(line){
  //%sword
  //$=0
  const re_flgs =/^%/
  line=line.trim()
  if(re_flgs.test(line)){
    line =line.replace('%','')
    const {flgs} = get()
    return flgs[line]?true:false
  }else{
    const ret =_eval(line)
    return ret?true:false
  }  
}

function calc_jump(line){
  const re_ifjump=/^>>>.+>>>/,
        re_sub=/^###/,
        re_justsub=/^###$/,
        re_flg=/^%/
  const {flgs,lines} = get()
  var flg,addr,issub,justsub
  if(!re_ifjump.test(line)){
    flg=true
    addr=line.split('>>>').map(d=>d.trim()).filter(d=>d).join('')
  }else{
    var ary =line.split('>>>').map(d=>d.trim()).filter(d=>d)
    //debug(ary)
    flg=_if(ary[0])
    addr=ary[1]
  }

  issub=re_sub.test(addr)
  justsub=re_justsub.test(addr)
  if(!justsub){
    //has addr    
    const num=lines.findIndex(d=>d===addr)  
    if(num===-1) flg = false
  }
  
  return {flg,addr,issub,justsub}
}


//----register-----

const re_eval=/^\$/,
      re_mark=/^#/,
      re_jump=/^>>>/,
      re_eval_multi=/^-{3,}js/,
      re_multi=/^-{3,}/,
      re_flg=/^%/

//eval
reg({re:re_eval,fn:async_eval})
reg({re:re_eval_multi,fn:async_eval})
//multi
reg({re:re_multi,fn:multi})
//mark
reg({re:re_mark,fn:mark})
//jump
reg({re:re_jump,fn:jump})
//flg
reg({re:re_flg,fn:flg})


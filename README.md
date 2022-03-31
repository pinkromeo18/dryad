# dryad
dryad is game engine

### system map
```
+-- core.js --+      +-- dryad.js --+
| model       |      |              |
| view        | <--- | script       |
| control     |      |              |
+-------------+      +--------------+
```

### view
```
view
    .hint
    .log
    .select
    .background
    .image
    .dungeon
    .map
    .clear
```
```
+-----------------------------------+
|            * hint *               |
| +-------------------------------+ | 
| |                               | |
| |           log                 | |  
| |                               | | 
| +-------------------------------+ |
|      +--------------------+       |
|      | > select 0         |       |
|      |   select 1         |       |
|      |   select 2         |       |
|      |   ...              |       | 
|      |   select 7         |       |
|      +--------------------+       |
+-----------------------------------+

+-----------------------------------+
|  background                       |
|      +--------------------+       |
|      |                    |       |
|      |                    |       |
|      |                    |       |
|      |       image        |       |
|      |                    |       |
|      |                    |       |
|      |                    |       |
|      |                    |       |
|      +--------------------+       |
|                                   |
+-----------------------------------+

+-----------------------------------+
|  dungeon                          |
|      +--------------------+       |
|      |  map               |       |
|      |                    |       |
|      |                    |       |
|      |                    |       |
|      |                    |       |
|      |                    |       |
|      |                    |       |
|      |                    |       |
|      +--------------------+       |
|                                   |
+-----------------------------------+

```


### data reader
```

var temp=`
[aiuewo]
a=---
multi string 1
multi string 2
multi string 3
-----
b=1
c=2
d="a"

`;

var obj=parse(temp);
{
 aiuewo:{
  a:"multi...\n...\n...\n",
  b:1,
  c:2,
  d:"a"
 }
}


```

### interpreter
```
# : mark
>>> : jump
>>> $0==0 >>>  : if jump
### : sub routine
$,$0...$9 : input
@ : function return value is $name
@k : key
--- aaa --- : multi string
---js console.log($) --- : javascript world

```

```
サブルーチンとして呼び出した場合は、
ジャンプに来ると、呼び出し先にもどる。
その場合は、###を指定する。

#test

>>> ###sub

>>> #test

###sub
aaa
>>> ###

```





















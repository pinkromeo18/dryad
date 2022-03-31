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
|      |   select 3         |       |
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

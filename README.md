# Spritesheet Maker

This is a simple tool to create a spritesheet from a folder of images.

## Usage
Input files :
```
input/
├─ mysprites1/
│  ├─ image1.png
│  ├─ image2.png
│  ├─ ...
├─ mysprites2/
│  ├─ image1.png
│  ├─ image2.png
│  ├─ ...
```

Output files :
```
output/
├─ mysprites1.png
├─ mysprites2.png
```

## Script file
You can configure the spritesheet maker with a script file. The script file is a JSON file with the following structure :

```json
{
    "input": "input/",
    "output": "output/",
    "spritesheets": [
        {
            "name": "mysprites1",
            "files": [
                "image1.png",
                "image2.png",
                ...
            ]
        },
        {
            "name": "mysprites2",
            "files": [
                "image1.png",
                "image2.png",
                ...
            ]
        }
    ]
}
```

## Command line

#### Specify script file
```
--script <script file path> : specify the path to the script file
```

#### Specify a path origin
```
--origin <origin path> : specify the path to the origin folder
```
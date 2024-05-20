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

## Config file
You can specify the path to the script file with the `script` variable in the config file. The config file is a JSON file with the following structure :

```json
{
    "script": "script.json"
}
```
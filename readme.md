# Text to JSON Search Application

This application is a simple text-to-JSON converter. It reads text files from a specified directory and converts them into JSON format. The converted JSON data is then saved into a file named `output.json`.

## Prerequisites
Before running this application, make sure you have the following dependencies installed:
- Node.js
- NPM
## Installation
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install the dependencies:

  

```
bash

npm install
```


## Usage

  1. Create the `output.json` file by following the instructions inside the text2json.js file.
		
        a. Example data to be read from text or markdown files in your given directory:

```
at the beach during sunset, waves and palm trees in color of green, blue

pencil painting of a black Jeep soft top off with large wheels at the Grand Canyon during sunset, black and white with white background
```


2. Ensure that a `output.json` file does exist.
        
        a. Example of data in the `output.json` file:
        <pre>
              {
                "id": "e4ec412f-8223-4382-a76d-278d7efdeb4b",
                "name": "3d paintings",
                "prompt": "at the beach during sunset, waves and palm trees in color of green, blue"
              }
        </pre>
       
        b. The `id` is just a genric GUID for references. The `name` is the file name 
            this prompt came from. `prompt` is the actual text. 

3. use `npm start` to run the web application.

4. Searches are based on the prompt text.
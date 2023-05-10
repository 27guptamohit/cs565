# Obbligato

Obbligato is a web application that tackles the task of [optical music recongition (OMR)](https://en.wikipedia.org/wiki/Optical_music_recognition) through the power of crowdsourcing. Automated OMR systems still tend to struggle with handwritten sheet music, so the question we set out to answer was if we could employ people (including those without prior music experience) to digitally transcribe sheet music instead. This website hosts a simple study that we ran to test the crowd's capabilities on some test sheet music. We found that, despite most participants having little musical experience, the crowd was able to correctly digitize measures with 95% accuracy. There is still much work to be done given that Obbligato was launched with a very limited musical vocabulary (three types of notes and three types of rests), but it is a promising example of the crowd's capabilities with respect to digitizing sheet music.

Created by Runyao Fan, Mohit Gupta, Naman Jain, Chris Kull, Weili Li and Yutao Zhou from the University of Illinois Urbana-Champaign. 

## Contents

- [Implementation Details](#implementation-details)
- [Development Environment Setup](#development-environment-setup)
- [Running the Server](#running-the-server)
- [Deployment](#deployment)

## Implementation Details

This repository contains the frontend code for the website, written using Typescript and React. [The sister backend repository can be found here.](https://github.com/CS-565-SP-2023/Obbligato-backend)

## Development Environment Setup

Install nvm, node.js, npm (MacOS/Linux, [original reference](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# The below command may be needed so that nvm can be found by your shell
export NVM_DIR="$HOME/.nvm"
\. "$NVM_DIR/nvm.sh"
\. "$NVM_DIR/bash_completion"

nvm install --lts
```

Note that Windows will have to install a different way, [see here](https://github.com/coreybutler/nvm-windows).

Install all node packages:
```bash
npm install
```

## Running the Server

To run the server for development:
```bash
npm start
```

## Deployment

Deployment is done via GitHub pages. In order to deploy:
```bash
npm run deploy
```
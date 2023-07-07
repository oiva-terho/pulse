# Authonomus landing page 

It has no dependences, uses pure html, css, js.
After build can be started from dist folder directly.

Deploy: https://pulse-oiva.netlify.app/

## Features

1. html5 tags like `<section>`, `<header>`, `<footer>`, `<dialog>`
2. styles based on scss, compiled by gulp
  + uses variables, animations, filestructure, class naming by sections
  + slider in carousel section is realised on pure css
  + tabs in catalog section are realised on pure css
3. vanilla js controls: 
  + sided of item card in catalog section
  + apper of back to top arrow and smooth scroll
  + opening of modal windows powered by `<dialog>` element
  + form validation and object of error codes
  + controll of submit: loading, success and failure

## Setup

Uses gulp as a builder and dev server, updater
To build run: 

  ```bash
  npm i
  npm run build
  ```

# orion-design
Vue and Typescript library for [Prefect 2.0](https://github.com/PrefectHQ/prefect) and [Prefect Cloud 2.0)[https://www.prefect.io/cloud/]. The components and utilities in this project are not meant to be used independently. 

## Install
```
npm i @prefecthq/orion-design --save --save-exact
```

## Demo
https://orion-design.netlify.app/

To run locally for devlopment you can use `npm run serve` and go to http://localhost:3000/

## Developing with Prefect Orion-UI

If you plan to develop against the Prefect Orion-UI you can run the orion-design package locally.

### Via CLI (Preferred)

You can install orion-design locally like so where `../../orion-design` is the relative path from your current project’s directory to the orion-design project directory:

`npm i @prefecthq/orion-design@../../orion-design --save`

You can also use an absolute path. 

<aside>
💡 Keep in mind this will update both the package.json and package-lock.json files. Be sure to not commit the changes to these two files.

💡 Linking a package this way is the safest as it avoids having to do an `npm i` (see [Install VS Clean Install](https://www.notion.so/Prefect-NPM-Packages-25ea36a4ed7341deaa4c3ac523767648))

</aside>

Then when linking orion-design to the prefect/orion-ui project you can do the following:

In orion-design (this repo):

`npm run dev`

In [orion-ui](https://github.com/PrefectHQ/prefect/tree/main/orion-ui):

`npm run serve`

Now any change you make in orion-design will trigger a reload in orion-ui. 

## Update
To update a package in a project you can either install `latest` or a specific version like

```
npm i @prefecthq/orion-design@latest --save --save-exact
```
OR
```
npm i @prefecthq/orion-design@0.1.60 --save --save-exact
```

## Disclaimer
This project does not follow SEM versioning and major, minor, and patch updates mostly signify progress toward objectives. Breaking changes are introduced regularly without releasing a major version.

# prefect-ui-library
This library is the Vue and Typescript component library for [Prefect 2](https://github.com/PrefectHQ/prefect) and [Prefect Cloud 2](https://www.prefect.io/cloud/). _The components and utilities in this project are not meant to be used independently_. 

## Install
```
npm i @prefecthq/prefect-ui-library --save --save-exact
```

## Developing with Prefect UI

If you plan to develop against the Prefect UI you can install the prefect-ui-library package locally.

We recommend using the cli and running

`npm i @prefecthq/prefect-ui-library@../../prefect-ui-library --save`

in the Prefect UI project where `../../prefect-ui-library` is the relative path from your Prefect UI project’s directory to the prefect-ui-library project directory. You can also use an absolute path. 

If you have done this succesfully, you should see your Prefect UI package.json and package-lock.json updated to show your local prefect-ui-library. 

<aside>
💡 Keep in mind this will update both the package.json and package-lock.json files. Be sure to not commit the changes to these two files.

💡 Linking a package this way is the safest as it avoids having to do an `npm i`.

</aside>

Then when linking prefect-ui-library to the prefect/UI project you can do the following:

In prefect-ui-library (this repo):

`npm run dev`

In [ui](https://github.com/PrefectHQ/prefect/tree/main/ui):

`npm run serve`

Now any change you make in prefect-ui-library will trigger a reload in UI. 

## Update
To update a package in a project you can either install `latest` or a specific version like

```
npm i @prefecthq/prefect-ui-library@latest --save --save-exact
```
OR
```
npm i @prefecthq/prefect-ui-library@0.1.60 --save --save-exact
```

## Versioning
This project does not follow SEM versioning and major, minor, and patch updates mostly signify progress toward objectives. Breaking changes are introduced regularly without releasing a major version. For more information, see the [Prefect versioning docs](https://docs.prefect.io/contributing/versioning/)

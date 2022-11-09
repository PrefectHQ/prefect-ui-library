# orion-design
Vue and Typescript library for [Prefect 2.0](https://github.com/PrefectHQ/prefect) and [Prefect Cloud 2.0)[https://www.prefect.io/cloud/]. The components and utilities in this project are not meant to be used independently. 

## Install
```
npm i @prefecthq/orion-design --save --save-exact
```

## Demo
https://orion-design.netlify.app/

To see the demo running locally and for devlopment you can use `npm run serve` and go to http://localhost:3000/

## Update
To update a package in a project you can either install `latest` or a specific version like

```
npm i @prefecthq/orion-design@latest --save --save-exact
```
OR
```
npm i @prefecthq/orion-design@0.1.60 --save --save-exact
```

## Developing with Prefect Orion-UI

Frequently when working on a project you’ll need to make a change to a package that is a dependency. For example, when developing orion-ui it’s very common to need to make changes or add things to the orion-design package. To link a package locally you’ll need to install that package using a file path. 

### Via CLI (Preferred)

You can install orion-design locally like so where `../../orion-design` is the relative path from your current project’s directory to the orion-design project directory. You can also use an absolute path. 

`npm i @prefecthq/orion-design@../../orion-design --save`

<aside>
💡 Keep in mind this will update both the package.json and package-lock.json files. Be sure to not commit the changes to these two files.

</aside>

This works the same for any other package. As long as you use the correct path you can install any package locally. Another example is installing miter-design locally into orion-ui. If prefect-design’s directory is the same as orion’s then the path would be `../../prefect-design`

`npm i @prefecthq/prefect-design@file../../prefect-design --save`

To unlink a package, simply reinstall the package (See [Installing a Package](https://www.notion.so/Prefect-NPM-Packages-25ea36a4ed7341deaa4c3ac523767648))

<aside>
💡 Linking a package this way is the safest as it avoids having to do an `npm i` (see [Install VS Clean Install](https://www.notion.so/Prefect-NPM-Packages-25ea36a4ed7341deaa4c3ac523767648))

</aside>

<aside>
📌 You may opt to [create a zsh alias](https://www.notion.so/Set-an-alias-in-zsh-to-install-local-orion-design-545cef1a3e5b49e2b35c0fd43dad3706) for automatically linking certain packages.

</aside>

### Via package.json

Alternatively, you can edit the `package.json` of your project manually. Replace the version of the package you would like to link to the path where the package is located. 

```json
{
  ...
  "dependencies": {
    "@prefecthq/orion-design": "packages/orion-design"
  }
  ...
}
```

Save the `package.json` and then run `npm i` to link the package.

### Building packages and HMR

When a package is linked locally the actual build of that package will be used. So in order to see your changes to the package, you’ll need to either build the package after each change or run a dev task that builds the package using a watcher. 

In the main project, running any building task (build, dev, serve) will pick up any changes to the packages build output. For example, when linking orion-design to the prefect/orion-ui project you can do the following:

In orion-design (this repo):

`npm run dev`

In [orion-ui](https://github.com/PrefectHQ/prefect/tree/main/orion-ui):

`npm run serve`

Now any change you make in orion-design will trigger a reload in orion-ui. 

## Install VS Clean Install

When working with packages it’s helpful to understand the difference between the `npm i` and `npm ci` commands. 

`npm i` is short for `npm install`. When running this command npm looks at the `package.json` and attempts to install any packages listed. If a package is already installed AND it meets the criteria in `package.json` it will be skipped. If a package is not installed it will install the most recent version that satisfies the version specified, it will also update the `package-lock.json` with the version that was installed. **This can be dangerous** when a specific version of a package is not specified. It is common to “delete node_modules and reinstall” to make sure packages are installed correctly. However, doing so means packages can be updated accidentally. 

`npm ci` is a “Clean Install” and is most commonly used in ci/cd environments. However, it's very useful for local development. Most of the time when you need to “delete node_modules and reinstall” using `npm ci` is preferred. `npm ci` will remove all the packages from `node_modules` and reinstall them. However in contrast to `npm i` **it will install the specific version** from the `package-lock.json`. This is much safer.

## Disclaimer
This project does not follow SEM versioning and major, minor, and patch updates mostly signify progress toward objectives. Breaking changes are introduced regularly without releasing a major version.

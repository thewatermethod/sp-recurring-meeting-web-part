## recurring meeting callout (sharepoint web part)

- Displays a link to either a microsoft teams meeting or zoom meeting that goes "live" during a specific time

![Example with active callout](example.PNG)

![Example with inactive callout](example.PNG)

## Requires

Node v10.13

![version](https://img.shields.io/badge/version-1.11-green.svg)

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

- lib/\* - intermediate-stage commonjs build artifacts
- dist/\* - the bundled script, along with other resources
- deploy/\* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

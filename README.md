# Unvlogable [![Build Status](https://dev.azure.com/mamuso/mamuso/_apis/build/status/unvlogable?branchName=master)](https://dev.azure.com/mamuso/mamuso/_build/latest?definitionId=2&branchName=master)

Providing a unified interface and an standardized oembed output for video services.

This is an old idea that served as the foundation of [unvlog](http://unvlog.com), and we had implemented in this [old and rusty ruby gem](https://github.com/mamuso/acts_as_unvlogable).

## Usage

Calling unvlogable with a video url from the supported services will return an oembed object with `type`, `version`, `provider_name`, `title`, `thumbnail_url`, `html`, `width` and `height`.

```javascript
const unvlogable = require('unvlogable');

await unvlogable('https://www.youtube.com/watch?v=_Nwn9ybsCRk');
/*=> { type: 'video',
  version: '1.0',
  provider_name: 'youtube',
  title: 'Can\'t Stop by Red Hot Chili Peppers but I can\'t start...',
  thumbnail_url: 'https://i.ytimg.com/vi/_Nwn9ybsCRk/maxresdefault.jpg',
  html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/_Nwn9ybsCRk?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  width: 480,
  height: 270 }
*/
```

Configure the width and height of the embed code passing the desired values.

```javascript
const unvlogable = require('unvlogable');

await unvlogable('https://www.youtube.com/watch?v=_Nwn9ybsCRk', {
  embed: { width: 800, height: 600 }
});
/*=> { type: 'video',
  version: '1.0',
  provider_name: 'youtube',
  title: 'Can\'t Stop by Red Hot Chili Peppers but I can\'t start...',
  thumbnail_url: 'https://i.ytimg.com/vi/_Nwn9ybsCRk/maxresdefault.jpg',
  html: '<iframe width="800" height="600" src="https://www.youtube.com/embed/_Nwn9ybsCRk?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  width: 800,
  height: 600 }
*/
```

## Running tests

```sh
$ npm i -d && npm test
```

## Contributing

For bugs and feature requests, [please create an issue](https://github.com/mamuso/unvlogable/issues/new). Pull requests are always welcome.

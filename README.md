# unicode-confusables
Utility for finding confusing unicode, sourced from [unicode UTS39](http://www.unicode.org/reports/tr39/)'s [confusables.txt](https://www.unicode.org/Public/security/10.0.0/confusables.txt).


### Installation

```sh
$ npm install unicode-confusables
```

### Usage

```javascript

const { isConfusing, confusables, rectifyConfusion } = require('unicode-confusables')

// check if a string is confusing
> isConfusing('fоо')
true
> isConfusing('foo')
false

// get the confusing parts of the string and their similarities
> confusables('fоо')
[
  { point: 'f' },
  { point: 'о', similarTo: 'o' },
  { point: 'о', similarTo: 'o' }
]

// apply the similar parts to the original string
> rectifyConfusion('fоо')
'foo'

// also finds hidden zero-width unicode
> isConfusing('vitalik')
true
> confusables('vitalik')
[
  { point: 'v' },
  { point: 'i' },
  { point: 't' },
  { point: 'a' },
  { point: '', similarTo: '' },
  { point: 'l' },
  { point: 'i' },
  { point: 'k' }
]

// even works with japanese!
> confusables('半角カナ')
[
  { point: '半' },
  { point: '角' },
  { point: 'カ', similarTo: '力' },
  { point: 'ナ' }
]
```

### Updating

Fetch and parse a fresh copy of confusables.txt

```sh
$ npm run build
```

### License

MIT

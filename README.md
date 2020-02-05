# feathers-react-hooks

> A collection of React hooks to build FeathersJS apps

[![NPM](https://img.shields.io/npm/v/feathers-react-hooks.svg)](https://www.npmjs.com/package/feathers-react-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save feathers-react-hooks
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'feathers-react-hooks'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [silvestreh](https://github.com/silvestreh)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

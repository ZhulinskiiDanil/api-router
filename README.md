## Methods

### `createApiSlice`
```js
import { createApiSlice } from 'api-router'

const usersSlice = createApiSlice({
  async getUserByName(name) {
    return { user: { name } }
  }
})
```

#### Example:
```js
await usersSlice.getUserByName("Jhon")
```

## Features

#### `slice[id].get()`
```js
import { createApiSlice } from 'api-router'
import GETProp from 'api-router/methods/get'

const usersSlice = createApiSlice({
  async [GETProp](id) {
    // Get user by id
    return { user: { id } }
  }
})
```

#### Example:
```js
await usersSlice["d8a-sv71-21c1d821d21"].get()
```

## Main use

##### APP/api/index.js
```js
import usersSlice from './slices/usersSlice.js'
import profileSlice from './slices/profileSlice.js'

const API = {
  users: usersSlice,
  profile: profileSlice
}

export default API
```

##### APP/api/slices/usersSlice.js
```js
import { createApiSlice } from 'api-router'
import GETProp from 'api-router/methods/get'

const usersSlice = createApiSlice({
  async [GETProp](id) {
    // Get user by id
    return { user: { id } }
  }
})
export default usersSlice
```

##### APP/api/slices/profileSlice.js
```js
import { createApiSlice } from 'api-router'

const profileSlice = createApiSlice({})
export default profileSlice
```

##### APP/index.js
```js
import API from './api'

const user = API.users["id-23csa-421reg64-jmnfg2"].get()
```
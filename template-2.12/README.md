# template-2.12

> Nuxt.js project template for v2.12.x with TypeScript

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Setup project with TypeScript

### Env

- Nuxt.js 2.12.1
- Node.js v12.16.1
- TypeScript 3.8.3

### Create project

```bash
npx create-nuxt-app template-2.12
```

Choose options

```bash
✨  Generating Nuxt.js project in template-2.12
? Project name template-2.12
? Project description Nuxt.js project template for v2.12.x with TypeScript
? Author name sumihiro3
? Choose programming language TypeScript
? Choose the package manager Npm
? Choose UI framework Vuetify.js
? Choose custom server framework None (Recommended)
? Choose the runtime for TypeScript @nuxt/typescript-runtime
? Choose Nuxt.js modules Axios, Progressive Web App (PWA) Support, DotEnv
? Choose linting tools Prettier
? Choose test framework None
? Choose rendering mode Universal (SSR)
? Choose development tools jsconfig.json (Recommended for VS Code)
```

install done

```bash
🎉  Successfully created project template-2.12

  To get started:

        cd template-2.12
        npm run dev

  To build & start for production:

        cd template-2.12
        npm run build
        npm run start


  For TypeScript users. 

  See : https://typescript.nuxtjs.org/cookbook/components/
```

run first

```bash
cd template-2.12/
npm run dev
```

run!

```bash
ℹ No type errors found                                                                                                                                          nuxt:typescript 14:49:10
ℹ Version: typescript 3.8.3                                                                                                                                     nuxt:typescript 14:49:10
ℹ Time: 11775ms                                                                                                                                                 nuxt:typescript 14:49:10
ℹ Waiting for file changes                                                                                                                                                      14:49:10
ℹ Memory usage: 491 MB (RSS: 618 MB)                                                                                                                                            14:49:10
ℹ Listening on: http://localhost:3000/    
```

run VSCode

```bash
code .
```

### クラスベース

install vue-property-decorator

```bash
npm install --save vue-property-decorator
```

add vue-shim.d.ts for \*.vue

```ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

#### index.vue を TypeScript に書き換え

index.vue の script 部分を書き換え

OLD

```html
<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'

  export default {
    components: {
      Logo,
      VuetifyLogo
    }
  }
</script>
```

New

```ts
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Logo: () => import('@/components/Logo.vue'),
    VuetifyLogo: () => import('@/components/VuetifyLogo.vue')
  }
})
export default class Index extends Vue {}
</script>
```

### Component に型定義を追加

component/Logo.vue

```ts
<script lang="ts">
  import {(Component, Vue)} from 'vue-property-decorator'

  @Component export
  default class Logo extends Vue {}
</script>
```

component/VuetifyLogo.vue

```ts
<script lang="ts">
  import {(Component, Vue)} from 'vue-property-decorator'
  
  @Component export
  default class VuetifyLogo extends Vue {}
</script>
```

run!!

```bash
npm run dev
```

### Linting

install eslint

```bash
npm install -D @nuxtjs/eslint-config-typescript
npm install -D eslint
npm install -D eslint-loader
```

add .eslintrc.js

```bash
touch .eslintrc.js
```

```js
module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript']
}
```

edit the lint script of your package.json:

```json
"lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
"lint-fix": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
```

run eslint auto
ホットリロードモードで ESLint を有効にする

```js
extend(config, ctx) {
    // Run ESLint on save
    if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
        })
    }
}
```

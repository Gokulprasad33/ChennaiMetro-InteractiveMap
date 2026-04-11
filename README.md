# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.13.1 create --template minimal --no-types --install npm CMDR-Map
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# Sources 
- CMRL Phase 2 : https://chennaimetrorail.org/wp-content/uploads/2025/03/Phase-II-Map-Updated-Map-PHASE-2.pdf
- Wiki Pedia Reference : https://upload.wikimedia.org/wikipedia/commons/4/4f/Chennai_Metro_Map_updated.svg



# TODO :
- [x] Metro liner chooser
- [ ] Add about page
    - [ ] Demonstration of how the website works
    - [ ] Github link
- [ ] Station details 
- [ ] Change station icon
- [ ] Add EMU routes
- [ ] Add railways station label

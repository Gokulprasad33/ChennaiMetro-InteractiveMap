<script>
  import { Dialog, Button } from "bits-ui";
</script>

<div class="min-h-screen w-full bg-black text-white flex items-center justify-center p-6">
  <Dialog.Root open>
    <Dialog.Portal>
      <Dialog.Overlay class="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <Dialog.Content
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               w-[90%] max-w-md rounded-2xl bg-black/90 text-white 
               border border-white/20 p-6 shadow-xl"
      >
        <Dialog.Title class="text-xl font-semibold mb-2">
          About
        </Dialog.Title>

        <Dialog.Description class="text-sm text-white/80 leading-relaxed">
          Chennai Transport Map is an interactive metro visualization where you can
          toggle lines and explore stations.
        </Dialog.Description>

        <div class="mt-4 text-xs text-white/50">
          Built using MapLibre GL + Svelte
        </div>

        <a
          href="https://github.com/Gokulprasad33"
          target="_blank"
          rel="noreferrer"
          class="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.23 1.84 1.23 1.08 1.85 2.82 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.04.14 3 .41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
          </svg>
          <span>github.com/Gokulprasad33</span>
        </a>

        <a
          href="https://github.com/Gokulprasad33/ChennaiMetro-InteractiveMap"
          target="_blank"
          rel="noreferrer"
          class="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        >
          Source Code
        </a>

        <div class="mt-6 flex justify-end gap-2">
          <Button.Root class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20" href="/">
            Back to Map
          </Button.Root>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
</div>

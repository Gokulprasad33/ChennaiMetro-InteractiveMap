<script lang="ts">
  let { value = "dark", onChange = (_theme: string) => {} }: { value?: string; onChange?: (theme: string) => void } = $props();

  const themes = ["light", "dark", "white", "grayscale", "black"];
</script>

<div class="absolute top-7 right-20 z-20 rounded-xl border border-white/20 bg-black/35 p-2 backdrop-blur-md">
  <div class="flex items-center gap-2">
    {#each themes as t}
      <button
        type="button"
        aria-label={`Switch to ${t} theme`}
        onclick={() => onChange(t)}
        class={`rounded-full px-3 py-1 text-sm transition ${value === t ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"}`}
      >
        {t}
      </button>
    {/each}
  </div>
</div>
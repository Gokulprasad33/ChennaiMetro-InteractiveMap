<script lang="js">
  import { Popover, Separator } from "bits-ui";
  import { Label, Switch } from "bits-ui";
  import { metroLines } from '$lib/store';
  import { base } from '$app/paths';

  const lines = [
    { name: 'Blue Line', key: 'blueLine', icon: '/icons/lines/blueLine.svg' },
    { name: 'Green Line', key: 'greenLine', icon: '/icons/lines/greenLine.svg' },
    { name: 'Orange Line', key: 'orangeLine', icon: '/icons/lines/orangeLine.svg' },
    { name: 'Violet Line', key: 'violetLine', icon: '/icons/lines/violetLine.svg' },
    { name: 'Red Line', key: 'redLine', icon: '/icons/lines/redLine.svg' }
  ];
</script>
 
<Popover.Root>
  <Popover.Trigger
    class="inline-flex h-10 select-none items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-black/70 px-[21px] text-[15px] font-medium text-white shadow-mini backdrop-blur-sm transition-all hover:cursor-pointer hover:bg-black/85 active:scale-[0.98]"
  >
    Lines
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content
      class="origin-(--bits-popover-content-transform-origin) z-30 w-full max-w-[328px] rounded-[12px] border border-white/20 bg-black/85 p-4 text-white shadow-popover backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      sideOffset={8}
    >
      <div class="flex items-center">
        <div class="flex flex-col">
          <h4 class="text-[17px] font-semibold leading-5 tracking-[-0.01em] text-white">
            Lines
          </h4>
          <p class="text-sm font-medium text-white/70">
            Choose transport lines
          </p>
        </div>
      </div>
      <Separator.Root class="-mx-4 mb-6 mt-[17px] block h-px bg-white/15" />
      <div class="flex flex-col space-y-4">
        {#each lines as line, index}
          {#if index === 2}
            <Separator.Root class="-mx-4 my-1 block h-px bg-white/15" />
            <p class="text-xs font-semibold tracking-[0.08em] text-white/65 uppercase">
              Under Construction
            </p>
          {/if}
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img src="{base}{line.icon}" width="24" height="24" alt={line.name} class="h-6 w-6">
              <Label.Root for={line.key} class="text-sm font-medium text-white">{line.name}</Label.Root>
            </div>
            <Switch.Root
              id={line.key}
              checked={$metroLines[line.key]}
              onCheckedChange={(checked) => {
                metroLines.update(m => ({ ...m, [line.key]: checked }));
              }}
              class="relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-500"
            >
              <Switch.Thumb
                class="pointer-events-none block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
              />
            </Switch.Root>
          </div>
        {/each}

        <Separator.Root class="-mx-4 my-1 block h-px bg-white/15" />
        <p class="text-xs font-semibold tracking-[0.08em] text-white/65 uppercase">
          Railways
        </p>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="h-6 w-6 rounded-full bg-white/20"></div>
            <Label.Root for="trainLine" class="text-sm font-medium text-white">Train</Label.Root>
          </div>
          <Switch.Root
            id="trainLine"
            checked={$metroLines.trainLine}
            onCheckedChange={(checked) => {
              metroLines.update(m => ({ ...m, trainLine: checked }));
            }}
            class="relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-500"
          >
            <Switch.Thumb
              class="pointer-events-none block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
            />
          </Switch.Root>
        </div>
      </div>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
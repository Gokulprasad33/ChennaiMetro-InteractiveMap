<script lang="ts">
  import { Popover, Separator } from "bits-ui";
  import { Label, Switch } from "bits-ui"; 
  import blueLineIcon from "../../static/icons/lines/blueLine.svg"
  import greenLineIcon from "../../static/icons/lines/greenLine.svg"
  import orangeLineIcon from "../../static/icons/lines/orangeLine.svg"
  import violetLineIcon from "../../static/icons/lines/violetLine.svg"
  import redLineIcon from "../../static/icons/lines/redLine.svg"


  let blueLine = $state(true);
  let greenLine = $state(true);
  let redLine = $state(true);
  let violetLine = $state(true);
  let orangeLine = $state(true);

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
      <div class="flex items-center pb-2">
        <div class="flex items-center">
            <div>
                <h1>Active</h1>
                <div class="flex items-center space-x-3 m-3">
                  
                  <Label.Root for="BlueLine" class="text-sm font-medium text-white">Blue Line&nbsp</Label.Root>
                  <img src={blueLineIcon} width="50px" height="50px">
                  <Switch.Root
                    bind:checked={blueLine}
                    id="BlueLine"
                    name="Blue"
                    class="ml-2 focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-white data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-white focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full border border-white/40 px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    <Switch.Thumb
            class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[30px] shrink-0 rounded-full border border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_14px_rgba(0,0,0,0.45)] transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
                    />
                  </Switch.Root>
                </div>
                <div class="flex items-center space-x-3 m-3">
                  
                  <Label.Root for="GreenLine" class="text-sm font-medium text-white">Green Line</Label.Root>
                  <img src={greenLineIcon} width="50px" height="50px">
                  <Switch.Root
                    bind:checked={greenLine}
                    id="GreenLine"
                    name="Green"
                    class="ml-2 focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-white data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-white focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full border border-white/40 px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    <Switch.Thumb
            class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[30px] shrink-0 rounded-full border border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_14px_rgba(0,0,0,0.45)] transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
                    />
                  </Switch.Root>
                </div>
                <Separator.Root class="-mx-4 mb-6 mt-[17px] block h-px bg-white/15" />
                <h1>Under Construction</h1>
                <div class="flex items-center space-x-3 m-3">
                  
                  <Label.Root for="OrangeLine" class="text-sm font-medium text-white">Orange Line</Label.Root>
                  <img src={orangeLineIcon} width="50px" height="50px">
                  <Switch.Root
                    bind:checked={orangeLine}
                    id="OrangeLine"
                    name="Orange"
                    class="ml-2 focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-white data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-white focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full border border-white/40 px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    <Switch.Thumb
            class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[30px] shrink-0 rounded-full border border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_14px_rgba(0,0,0,0.45)] transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
                    />
                  </Switch.Root>
                </div>  
                <div class="flex items-center space-x-3 m-3">
                  
                  <Label.Root for="RedLine" class="text-sm font-medium text-white">Red Line&nbsp&nbsp&nbsp</Label.Root>
                  <img src={redLineIcon} width="50px" height="50px">
                  <Switch.Root
                    bind:checked={redLine}
                    id="RedLine"
                    name="Red"
                    class="ml-2 *:focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-white data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-white focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full border border-white/40 px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    <Switch.Thumb
            class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[30px] shrink-0 rounded-full border border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_14px_rgba(0,0,0,0.45)] transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
                    />
                  </Switch.Root>
                </div>
                <div class="flex items-center space-x-3 m-3">
                  
                  <Label.Root for="VioletLine" class="text-sm font-medium text-white">Violet Line</Label.Root>
                  <img src={blueLineIcon} width="50px" height="50px">
                  <Switch.Root
                    bind:checked={violetLine}
                    id="VioletLine"
                    name="Violet"
                    class="ml-2 focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=checked]:bg-white data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-white focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full border border-white/40 px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    <Switch.Thumb
            class="bg-background data-[state=unchecked]:shadow-mini dark:border-background/30 dark:bg-foreground dark:shadow-popover pointer-events-none block size-[30px] shrink-0 rounded-full border border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_14px_rgba(0,0,0,0.45)] transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:border dark:data-[state=unchecked]:border"
                    />
                  </Switch.Root>
                </div>
            </div>
        </div>
      </div>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
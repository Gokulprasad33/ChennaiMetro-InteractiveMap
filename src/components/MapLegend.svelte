<script>
	import { Separator } from 'bits-ui';
	import { base } from '$app/paths';

	const metroLines = [
		{ name: 'Blue Line', icon: '/icons/lines/blueLine.svg' },
		{ name: 'Green Line', icon: '/icons/lines/greenLine.svg' },
		{ name: 'Orange Line', icon: '/icons/lines/orangeLine.svg' },
		{ name: 'Red Line', icon: '/icons/lines/redLine.svg' },
		{ name: 'Violet Line', icon: '/icons/lines/violetLine.svg' }
	];
</script>

<div
	class="absolute bottom-5 right-20 z-10 hidden w-64 rounded-2xl border border-white/10 bg-black/50 p-4 text-white shadow-xl backdrop-blur-lg md:block"
>
	<h3 class="mb-3 text-lg font-semibold">Legend</h3>

	<div class="grid grid-cols-1 gap-y-3">
		<!-- Metro Lines -->
		<div>
			<span class="text-sm font-medium text-white/80">Metro Lines</span>
			<div class="mt-2 flex flex-col gap-2">
				{#each metroLines as line}
					<div class="flex items-center gap-2">
						<img src="{base}{line.icon}" alt="{line.name} icon" class="h-5 w-5" />
						<span class="text-xs">{line.name}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Railway Line -->
		<div>
			<div class="mt-2 flex items-center gap-2">
				<div class="h-4 w-4 rounded-sm bg-yellow-400"></div>
				<span class="text-xs">Indian Railways</span>
			</div>
		</div>

		<Separator.Root class="my-2 bg-white/20" />

		<!-- Stations -->
		<div>
			<span class="text-sm font-medium text-white/80">Stations</span>
			<div class="mt-2 flex flex-col gap-2">
				<div class="flex items-center gap-2">
					<div class="h-4 w-4 rounded-full border-2 border-black bg-white"></div>
					<span class="text-xs">Metro Station</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-4 w-4 rounded-full border-2 border-gray-600 bg-white"></div>
					<span class="text-xs">Railway Station</span>
				</div>
			</div>
		</div>

		<!-- Future Template -->
		<!-- 
        <Separator.Root class="my-2 bg-white/20" />
        <div>
            <span class="text-sm font-medium text-white/80">Future Category</span>
            <div class="mt-2 flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <div class="h-4 w-4 bg-gray-500"></div>
                    <span class="text-xs">Future Item</span>
                </div>
            </div>
        </div> 
        -->
	</div>
</div>

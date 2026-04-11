import { writable } from 'svelte/store';

export const metroLines = writable({
  blueLine: true,
  greenLine: true,
  orangeLine: true,
  violetLine: true,
  redLine: true,
});


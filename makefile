local: main.ts
	deno run --allow-net main.ts

lw: main.ts
	deno run --watch --unstable --allow-net main.ts

deploy: main.ts
	deployctl run --no-check ./main.ts

dw: main.ts 
	deployctl run --watch --no-check ./main.ts

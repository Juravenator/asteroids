[parallel]
dev: tsc-watch run-server html-watch

tsc-watch:
    watchexec -w src -- just tsc

tsc:
    mkdir -p dist tsc
    npx tsc
    npx rollup --config=rollup.mjs tsc/index.js --file dist/index.js

html-watch:
    watchexec -w src -- just html

html:
    mkdir -p dist
    rsync -a src/*.html dist

run-server:
    mkdir -p dist
    python3 -m http.server --bind 0.0.0.0 --directory dist

clean:
    rm -rf dist tsc
import esbuild from "esbuild";
import server, { log, update } from "create-serve";
import chokidar from "chokidar";

const isWatchMode =
  process.argv.includes("--watch") || process.argv.includes("-w");

const serveWithEsbuild = async (
  options = {},
  serverOptions = { root: ".", port: 4000 },
  watchDir = "."
) => {
  const buildResult = await esbuild
    .context({
      ...options,
    })
    .catch(() => process.exit(1));

  if (isWatchMode) {
    server.start(serverOptions);

    const watcher = chokidar.watch(watchDir, {
      ignored: /(^|[\/\\])\../, // ignore dot files like e.g .env
      persistent: true,
    });

    watcher.on("all", (ev, path) => {
      update(`Updating changes -> ${path}`);
      buildResult.rebuild().catch((err) => {
        server.update();
        log(err);
      });
    });

    watcher.on("error", (error) => log(error));

    buildResult.watch().then(() => {
      buildResult.rebuild().catch((err) => {
        server.update();
        log(err);
      });
    });
  } else {
    await buildResult.serve({
      servedir: serverOptions.root,
      port: serverOptions.port,
    });
  }
};

export default serveWithEsbuild;

import esbuild from "esbuild";
import server from "create-serve";

const isWatchMode =
  process.argv.includes("--watch") || process.argv.includes("-w");

const serveWithEsbuild = async (
  options = {},
  serverOptions = { root: ".", port: 4000 }
) => {
  const buildResult = await esbuild
    .context({
      ...options,
    })
    .catch(() => process.exit(1));

  if (isWatchMode) {
    server.start(serverOptions);

    buildResult.watch().then(() => {
      buildResult.rebuild().catch((err) => {
        server.update();
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

const args = {};

const argv = process.argv.slice(2);

for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  const key = argv[i].split("=")[0].substring(2);
  const value = argv[i].split("=")[1] || true;
  args[key] = value;
}

export { args };

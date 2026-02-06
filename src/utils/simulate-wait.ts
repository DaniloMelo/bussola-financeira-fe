export default async function simulateWait(
  seconds: number = 0,
  verbose: boolean = false,
) {
  if (seconds <= 0) return;

  if (verbose) {
    console.info(`Simulando delay de ${seconds}s`);
  }

  return new Promise((resolve) => {
    return setTimeout(resolve, seconds * 1000);
  });
}

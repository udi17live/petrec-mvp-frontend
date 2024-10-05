// export function formatTime(seconds: number) {
//   const mins = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${mins.toString().padStart(2, "0")}:${secs
//     .toString()
//     .padStart(2, "0")}.${(seconds % 1).toFixed(2).slice(2)}`;
// }

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 100); // Convert fractional seconds to milliseconds

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}.${millis.toString().padStart(2, "0")}`;
}

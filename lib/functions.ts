
export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 100); // Convert fractional seconds to milliseconds

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}.${millis.toString().padStart(2, "0")}`;
}

export function getLoginErrorMessage(error:string | null | undefined) {
  if (error === null || error == undefined) {
    return "Login Failed. Something went wrong"
  }
  if (error === 'CredentialsSignin') {
    return "Invalid Credentials."
  } else {
    return "Login Failed. Something went wrong"
  }
}
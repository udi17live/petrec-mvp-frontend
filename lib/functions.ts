
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


export function formatTimeString(date: Date){
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
  }

  return age;
}
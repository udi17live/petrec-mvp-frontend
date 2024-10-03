export default function AppointmentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <h1>Appointment Page: Selected Id is {id}</h1>;
}

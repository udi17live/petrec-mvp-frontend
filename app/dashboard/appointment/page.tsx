"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getAppointments } from "@/actions/appointments";
import { useSession } from "next-auth/react";
import AppointmentTable from "@/components/AppointmentTable";

export default function Appointments() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all')

  async function fetchAppointments(doctorId: number, filter: string) {
    try {
      const fetchedAppointments = await getAppointments(Number(doctorId))

      if (filter !== 'all') {
        const filtered = fetchedAppointments.filter(appointment => appointment.statusId === filter.toUpperCase());
        setAppointments(filtered)
      } else {
        setAppointments(fetchedAppointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      const user = await session?.user;
      console.log("SE: ", user?.id);
      if (user) {
        console.log("USER: ", user.name);
        const doctorId = Number(user?.id);
        await fetchAppointments(doctorId, activeTab);
      }
    };
    setIsLoading(true)
    fetchData();
    setIsLoading(false)
  }, [activeTab, session]);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
          <TabsTrigger value="upcoming" onClick={() => setActiveTab('UPCOMING')}>Upcoming</TabsTrigger>
          <TabsTrigger value="inprogress" onClick={() => setActiveTab('INPROGRESS')}>In Progress</TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setActiveTab('COMPLETED')}>Completed</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all">
        <AppointmentTable filter={activeTab} appointments={appointments} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="upcoming">
        <AppointmentTable filter={activeTab} appointments={appointments} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="inprogress">
        <AppointmentTable filter={activeTab} appointments={appointments} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="completed">
        <AppointmentTable filter={activeTab} appointments={appointments} isLoading={isLoading} />
      </TabsContent>
    </Tabs>
  );
}

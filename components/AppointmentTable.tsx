"use client"

import { formatTimeString } from "@/lib/functions"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table"
import { Badge } from "./ui/badge"
import Link from "next/link"


interface AppointmentsProps {
    filter: string,
    appointments: any[],
    isLoading: boolean
}

export const AppointmentTable: React.FC<AppointmentsProps> = ({ filter, appointments, isLoading }) => {
    return <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
            <CardTitle>{filter.toUpperCase()} APPOINTMENTS</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Pet Name</TableHead>
                        <TableHead>Pet Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Start</TableHead>
                        <TableHead className="hidden md:table-cell">End</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ?? <TableRow><TableCell>Loading Data...</TableCell></TableRow>}
                    {appointments.length === 0 ?? <TableRow><TableCell>No records to show</TableCell></TableRow>}
                    {appointments.map((appointment) => (
                        <Link legacyBehavior key={appointment.id} href={`/dashboard/appointment/${appointment.id}`}>
                            <TableRow key={appointment?.id} className="cursor-pointer">
                                <TableCell className="font-medium">{appointment?.clientName}</TableCell>
                                <TableCell className="font-medium">{appointment?.petName}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{appointment?.speciesName}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={appointment?.statusId === "COMPLETED" ? "destructive" : "secondary"}>{appointment?.statusId}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {formatTimeString(appointment?.startTime)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {formatTimeString(appointment?.endTime)}
                                </TableCell>
                            </TableRow>
                        </Link>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>{appointments.length}</strong> Appointment(s)
            </div>
        </CardFooter>
    </Card>
}

export default AppointmentTable;
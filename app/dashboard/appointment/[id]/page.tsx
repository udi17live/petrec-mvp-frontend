"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Save, RefreshCcw, Loader2 } from "lucide-react";
import InputField from "@/components/InputField";
import EditableCard from "@/components/EditableCard";
import AudioRecorder from "@/components/AudioRecorder";
import AudioPlayback from "@/components/AudioPlayback";
import { getAppointment, getAppointmentExtended, saveAppointmentData } from "@/actions/appointments";
import { getAllSpecies } from "@/actions/species";
import { getPet } from "@/actions/pet";
import { AppointmentDataProcessingStatus, AppointmentStatus, Pet } from "@prisma/client";
import { calculateAge, formatTimeString } from "@/lib/functions";
import { AppointmentData, SoapNote } from "@/types/AppointmentExtended";
import SoapNotes from "@/components/SoapNotes";

export default function AppointmentPage({
  params,
}: {
  params: { id: string };
}) {
  // const [appointmentId] = useState(() => crypto.randomUUID());
  const [appointmentId] = useState(() => params.id);
  const [status, setStatus] = useState<AppointmentStatus>(AppointmentStatus.UPCOMING);
  const [recAudioFile, setRecAudioFile] = useState<File | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAppointmentComplete, setIsAppointmentComplete] = useState(false);
  const [soapNotes, setSoapNotes] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  });
  const [editingSoap, setEditingSoap] = useState({
    subjective: false,
    objective: false,
    assessment: false,
    plan: false,
  });
  const [clientName, setClientName] = useState("");
  const [petName, setPetName] = useState("");
  const [petWeight, setPetWeight] = useState(0);
  const [petAge, setPetAge] = useState(0);
  const [petSpecies, setPetSpecies] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [errors, setErrors] = useState({
    clientName: false,
    petName: false,
    petWeight: false,
    petAge: false,
    petSpecies: false,
  });
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [appointment, setAppointment] = useState({});
  const [pet, setPet] = useState<Pet | null>(null);
  const [petId, setPetId] = useState(0);
  const [species, setSpecies] = useState<any[]>([]);
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  const [scribeHash, setScribeHash] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [soapNote, setSoapNote] = useState<SoapNote>();
  const [isSaving, setIsSaving] = useState(false);
  const [clientSummary, setClientSummary] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const loadAppointmentData = async () => {
      try {
        setIsFetching(true);
        const appointmentExtended = await getAppointmentExtended(Number(params.id))
        setSpecies(appointmentExtended?.species)
        setScribeHash(appointmentExtended.scribeHash);
        setPetId(appointmentExtended.petId)
        setAppointment(appointmentExtended)
        setClientName(appointmentExtended?.clientName)
        setPetName(appointmentExtended?.pet?.name ?? "")
        setPetWeight(appointmentExtended?.pet?.weight ?? 0)
        setPetAge(calculateAge(appointmentExtended?.pet?.dateOfBirth ?? new Date()))
        setIsFetching(false);
        setFileUrl(appointmentExtended.fileUrl ?? "")
        setSoapNote(appointmentExtended?.soapNote)
        setClientSummary(appointmentExtended?.soapNote?.summary)
      } catch (err) {
        setIsFetching(false);
        console.error('Error loading user data or orders:', err);
      } finally {
        setIsFetching(false);
      }
    }
    loadAppointmentData();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [params.id]);

  const startRecording = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/m4a" });
      const audioFile = new File([audioBlob], "audio.m4a", {
        type: "audio/m4a",
      });
      setRecAudioFile(audioFile);
      console.log(audioFile);
    };
    mediaRecorder.current.start();
    setIsRecording(true);
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 0.1);
    }, 100);
  };

  const pauseRecording = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (mediaRecorder.current && mediaRecorder.current.state === "paused") {
      mediaRecorder.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
  };

  const stopRecording = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const deleteRecording = () => {
    setRecAudioFile(null);
    audioChunks.current = [];
    setRecordingTime(0);
  };

  function deleteInputFile() {
    setAudioFile(null);
  }

  const toggleEdit = (field: keyof typeof soapNotes) => {
    setEditingSoap((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSoapChange = (field: keyof typeof soapNotes, value: string) => {
    setSoapNotes((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAppointment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData();
    formData.append('id', String(params.id));
    formData.append('clientName', clientName);
    formData.append('petId', String(petId));
    formData.append('petName', petName);
    formData.append('petWeight', String(petWeight));
    formData.append('isCompleted', String(isAppointmentComplete));

    const audioBlob = audioFile ? audioFile : recAudioFile;
    if (audioBlob) {
      formData.append('audioFile', audioBlob);
    }

    console.log("Saving appointment:", {
      appointmentId: params.id,
      status: isAppointmentComplete ? "completed" : "ongoing",
      soapNotes,
      clientName,
      petName,
      petWeight,
      petAge,
      petSpecies,
      audioFile: audioBlob,
    });

    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        console.error(data.error);
      } else {
        console.log('Appointment saved:', data);
      }

      setStatus(isAppointmentComplete ? AppointmentStatus.COMPLETED : AppointmentStatus.UPCOMING);
      setIsSaving(false);
    } catch (error) {
      console.log("SAVING ERR: ", error);
      setIsSaving(false);
    }
  };

  const validateField = (field: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [field]: !eval(field) }));
  };

  const isFormValid =
    clientName &&
    petName &&
    petWeight &&
    (recAudioFile || audioFile);

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <>
      {isFetching && <div className="w-full h-full flex justify-center items-center"><Loader2 className="text-primary h-36 w-36 animate-spin" /></div>}
      {!isFetching && <div className="mx-auto p-6 space-y-8 max-w-4xl min-w-4xl">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Appointment: {appointment?.id}</h1>
            <div className="flex items-center space-x-2">
              <Badge variant={appointment?.statusId === "COMPLETED" ? "destrictive" : "secondary"}>
                {appointment?.statusId}
              </Badge>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Client Name"
              id="clientName"
              placeholder="Enter client name"
              required
              value={clientName}
              onChange={setClientName}
              onBlur={() => validateField("clientName")}
              error={errors.clientName}
            />
            <InputField
              label="Pet Name"
              id="petName"
              placeholder="Enter pet name"
              required
              value={petName}
              onChange={setPetName}
              onBlur={() => validateField("petName")}
              error={errors.petName}
            />
          </div>

          <div className="space-y-2">
            <Label>Pet Information</Label>
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="Weight"
                id="petWeight"
                placeholder="Enter weight"
                required
                value={petWeight.toString()}
                onChange={(value) => {
                  if (/^\d*\.?\d*$/.test(value)) setPetWeight(Number(value));
                }}
                onBlur={() => validateField("petWeight")}
                error={errors.petWeight}
              />
              <InputField
                isDisabled={true}
                label="Age"
                id="petAge"
                placeholder="Enter age"
                value={petAge.toString()}
                onChange={(value) => {
                  if (/^\d*$/.test(value)) setPetAge(Number(value));
                }}
                onBlur={() => validateField("petAge")}
                error={errors.petAge}
              />
              <div className="space-y-2">
                <InputField
                  isDisabled={true}
                  label="Pet Species"
                  id="petSpecies"
                  placeholder="Enter Pet Species"
                  value={petSpecies}
                  onChange={() => { }}
                  onBlur={() => { }}
                  error={errors.petSpecies}
                />
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardDescription>
                You may record a new audio clip or upload a audio clip
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="record" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="record" disabled={!!audioFile}>
                    Record
                  </TabsTrigger>
                  <TabsTrigger
                    value="upload"
                    disabled={isRecording || !!recAudioFile}
                  >
                    Upload
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="record">
                  <AudioRecorder
                    isRecording={isRecording}
                    isPaused={isPaused}
                    recordingTime={recordingTime}
                    onStartRecording={startRecording}
                    onPauseRecording={pauseRecording}
                    onResumeRecording={resumeRecording}
                    onStopRecording={stopRecording}
                  />
                  {recAudioFile && (
                    <div className="mt-4 flex items-center justify-evenly">
                      <AudioPlayback audioFile={recAudioFile} fileUrl={fileUrl} />
                      <div className="flex justify-center">
                        <Button variant="destructive" onClick={deleteRecording}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Recording
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="upload">
                  <div className="space-y-2">
                    <Label htmlFor="audioFile" className="flex items-center">
                      Upload Audio File
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="audioFile"
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        setAudioFile(e.target.files ? e.target.files[0] : null);
                        console.log(e.target.files);
                      }}
                    />
                    <p className="text-sm text-muted-foreground">
                      Supported formats: MP3, WAV, M4A, AAC
                    </p>
                    {audioFile && (
                      <div className="mt-4 flex items-center justify-evenly">
                        <AudioPlayback audioFile={audioFile} fileUrl={fileUrl} />
                        <div className="flex justify-center">
                          <Button variant="destructive" onClick={deleteInputFile}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Recording
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex items-center justify-center w-full"></div>
            </CardContent>
          </Card>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="appointmentComplete"
              checked={isAppointmentComplete}
              onCheckedChange={(checked) =>
                setIsAppointmentComplete(checked as boolean)
              }
            />
            <Label htmlFor="appointmentComplete">
              Mark appointment as complete
            </Label>
          </div>

          <Button
            className="w-full"
            onClick={handleSaveAppointment}
            disabled={!isFormValid || isSaving}
          >
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Appointment
          </Button>
        </form>

        <div className="space-y-6">


          {soapNote && <>
            <Label className="text-3xl font-bold">Soap Notes</Label>
            {/* Client Summary */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Client Summary</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isEditing ? handleSave : handleEdit}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={clientSummary}
                    onChange={(e) => setClientSummary(e.target.value)}
                    placeholder="Enter client summary here"
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-gray-600">
                    {clientSummary || 'No client summary yet.'}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* SOAP notes section */}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              </CardHeader>
              <CardContent>
                {soapNotes && <SoapNotes title="Subjective" initialNotes={soapNote?.subjectiveNote} />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              </CardHeader>
              <CardContent>
                {soapNotes && <SoapNotes title="Objective" initialNotes={soapNote?.objectiveNote} />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              </CardHeader>
              <CardContent>
                {soapNotes && <SoapNotes title="Assesment" initialNotes={soapNote?.assesmentNote} />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              </CardHeader>
              <CardContent>
                {soapNotes && <SoapNotes title="Plan" initialNotes={soapNote?.planNote} />}
              </CardContent>
            </Card>
          </>}
        </div>
      </div>
      }
    </>
  );
}

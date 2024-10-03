'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Square, Trash2, Play, Upload, Save, Edit, Check, RefreshCcw } from 'lucide-react'

// Utility function to format time
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Reusable InputField component
const InputField = ({ label, id, placeholder, type = "text", required = false, value, onChange, onBlur, error }: { label: string, id: string, placeholder: string, type?: string, required?: boolean, value: string, onChange: (value: string) => void, onBlur: () => void, error: boolean }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="flex items-center">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </Label>
    <Input 
      id={id} 
      placeholder={placeholder} 
      type={type} 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      required={required}
      className={error ? "border-red-500 focus:ring-red-500" : ""}
    />
  </div>
)

// Reusable EditableCard component
const EditableCard = ({ title, content, onEdit, isEditing, onSave }: { title: string, content: string, onEdit: () => void, isEditing: boolean, onSave: (value: string) => void }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Button onClick={isEditing ? () => onSave(content) : onEdit} variant="outline" size="sm">
        {isEditing ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Save
          </>
        ) : (
          <>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </>
        )}
      </Button>
    </CardHeader>
    <CardContent>
      {isEditing ? (
        <Textarea
          value={content}
          onChange={(e) => onSave(e.target.value)}
          placeholder={`Enter ${title.toLowerCase()} notes`}
        />
      ) : (
        <p>{content || `No ${title.toLowerCase()} notes yet.`}</p>
      )}
    </CardContent>
  </Card>
)

export default function Component() {
  const [appointmentId] = useState(() => crypto.randomUUID())
  const [status, setStatus] = useState<'ongoing' | 'completed'>('ongoing')
  const [recording, setRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isAppointmentComplete, setIsAppointmentComplete] = useState(false)
  const [soapNotes, setSoapNotes] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
  })
  const [editingSoap, setEditingSoap] = useState({
    subjective: false,
    objective: false,
    assessment: false,
    plan: false
  })
  const [clientName, setClientName] = useState('')
  const [petName, setPetName] = useState('')
  const [petWeight, setPetWeight] = useState('')
  const [petAge, setPetAge] = useState('')
  const [petSpecies, setPetSpecies] = useState('')
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [errors, setErrors] = useState({
    clientName: false,
    petName: false,
    petWeight: false,
    petAge: false,
    petSpecies: false,
  })
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.current = new MediaRecorder(stream)
    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data)
    }
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)
    }
    mediaRecorder.current.start()
    setIsRecording(true)
    setRecordingTime(0)
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1)
    }, 1000)
  }

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const deleteRecording = () => {
    setAudioUrl(null)
    audioChunks.current = []
    setRecordingTime(0)
  }

  const toggleEdit = (field: keyof typeof soapNotes) => {
    setEditingSoap(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSoapChange = (field: keyof typeof soapNotes, value: string) => {
    setSoapNotes(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveAppointment = () => {
    // Here you would typically save the appointment data to your server
    console.log('Saving appointment:', {
      appointmentId,
      status: isAppointmentComplete ? 'completed' : 'ongoing',
      soapNotes,
      clientName,
      petName,
      petWeight,
      petAge,
      petSpecies,
      audioFile: audioFile ? audioFile.name : audioUrl
    })
    setStatus(isAppointmentComplete ? 'completed' : 'ongoing')
  }

  const refreshSoapNotes = () => {
    // Here you would typically fetch the latest SOAP notes from your server
    console.log('Refreshing SOAP notes')
    // For demonstration, we'll just clear the current notes
    setSoapNotes({
      subjective: '',
      objective: '',
      assessment: '',
      plan: ''
    })
  }

  const validateField = (field: keyof typeof errors) => {
    setErrors(prev => ({ ...prev, [field]: !eval(field) }))
  }

  const isFormValid = clientName && petName && petWeight && petAge && petSpecies && (audioUrl || audioFile)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Appointment: {appointmentId}</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Dr. John Doe</Badge>
            <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="bg-muted p-4 rounded-md text-sm">
          <p>Appointment Start: 2023-06-15 10:00 AM</p>
          <p>Appointment End: 2023-06-15 11:00 AM</p>
          <p>Type: Check-up</p>
          <p>Booked via: Online</p>
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
            onBlur={() => validateField('clientName')}
            error={errors.clientName}
          />
          <InputField 
            label="Pet Name" 
            id="petName" 
            placeholder="Enter pet name" 
            required 
            value={petName} 
            onChange={setPetName}
            onBlur={() => validateField('petName')}
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
              value={petWeight} 
              onChange={(value) => {
                if (/^\d*\.?\d*$/.test(value)) setPetWeight(value)
              }}
              onBlur={() => validateField('petWeight')}
              error={errors.petWeight}
            />
            <InputField 
              label="Age" 
              id="petAge" 
              placeholder="Enter age" 
              required 
              value={petAge} 
              onChange={(value) => {
                if (/^\d*$/.test(value)) setPetAge(value)
              }}
              onBlur={() => validateField('petAge')}
              error={errors.petAge}
            />
            <div className="space-y-2">
              <Label htmlFor="petSpecies" className="flex items-center">
                Species
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select value={petSpecies} onValueChange={setPetSpecies}>
                <SelectTrigger className={errors.petSpecies ? "border-red-500 focus:ring-red-500" : ""}>
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="prev-notes">
            <AccordionTrigger>Previous Appointment Notes</AccordionTrigger>
            <AccordionContent>
              <Textarea placeholder="No previous notes available" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card>
          <CardHeader>
            <CardTitle>Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="record" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="record" disabled={!!audioFile}>Record</TabsTrigger>
                <TabsTrigger value="upload" disabled={isRecording || !!audioUrl}>Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="record">
                <div className="space-y-2">
                  <div className="flex space-x-2 items-center">
                    <Button onClick={isRecording ? stopRecording : startRecording} disabled={!!audioUrl}>
                      {isRecording ? <Square className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                      {isRecording ? 'Stop' : 'Start'} Recording
                    </Button>
                    {audioUrl && (
                      <>
                        <Button onClick={deleteRecording} variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                        <Button onClick={() => {}} variant="secondary">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                      </>
                    )}
                    <span className="ml-2">{formatTime(recordingTime)}</span>
                  </div>
                </div>
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
                    onChange={(e) => setAudioFile(e.target.files ? e.target.files[0] : null)}
                  />
                  <p className="text-sm text-muted-foreground">Supported formats: MP3, WAV, M4A, AAC</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="appointmentComplete" 
            checked={isAppointmentComplete}
            onCheckedChange={(checked) => setIsAppointmentComplete(checked as boolean)}
          />
          <Label htmlFor="appointmentComplete">Mark appointment as complete</Label>
        </div>

        <Button className="w-full" onClick={handleSaveAppointment} disabled={!isFormValid}>
          <Save className="mr-2 h-4 w-4" />
          Save Appointment
        </Button>
      </form>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">SOAP Notes</h2>
          <Button onClick={refreshSoapNotes} variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Notes
          </Button>
        </div>
        {Object.entries(soapNotes).map(([key, value]) => (
          <EditableCard
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            content={value}
            onEdit={() => toggleEdit(key as keyof typeof soapNotes)}
            isEditing={editingSoap[key as keyof typeof editingSoap]}
            onSave={(newValue) => handleSoapChange(key as keyof typeof soapNotes, newValue)}
          />
        ))}
      </div>
    </div>
  )
}
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Check, RefreshCcw } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SoapNote {
  title: string;
  value: string | Record<string, string> | string[];
}

interface SoapNotesProps {
  initialNotes: Record<string, SoapNote>;
  onRefresh: () => void;
}

const StringInput = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => (
  <Textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="min-h-[100px]"
  />
);

const ObjectInput = ({ value, onChange }: { value: Record<string, string>, onChange: (value: Record<string, string>) => void }) => (
  <div className="space-y-2">
    {Object.entries(value).map(([key, val]) => (
      <div key={key} className="flex items-center space-x-2">
        <span className="w-1/3 font-semibold">{key}:</span>
        <Input
          type="text"
          value={val}
          onChange={(e) => onChange({ ...value, [key]: e.target.value })}
          className="w-2/3"
        />
      </div>
    ))}
  </div>
);

const ArrayInput = ({ value, onChange }: { value: string[], onChange: (value: string[]) => void }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default newline behavior
      const newValue = [...value, '']; // Add an empty string to represent a new line
      onChange(newValue);
    }
  };

  return (
    <Textarea
      value={value.map(item => `- ${item}`).join('\n')}
      onChange={(e) => {
        const newValue = e.target.value.split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-'))
          .map(line => line.slice(1).trim());
        onChange(newValue);
      }}
      onKeyDown={handleKeyDown} // Add the key down handler
      className="min-h-[100px]"
    />
  );
};

const EditableCard = ({
  id,
  title,
  content,
  isEditing,
  onEdit,
  onSave,
}: {
  id: string;
  title: string;
  content: SoapNote;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (id: string, value: any) => void;
}) => {
  const [editableValue, setEditableValue] = useState(content.value);

  const handleSave = () => {
    onSave(id, editableValue); // Save the new value
    // onEdit(); // Close editing mode after saving
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button onClick={isEditing ? handleSave : onEdit} variant="outline" size="sm">
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
          typeof content.value === 'string' ? (
            <StringInput value={editableValue as string} onChange={setEditableValue} />
          ) : Array.isArray(content.value) ? (
            <ArrayInput value={editableValue as string[]} onChange={setEditableValue} />
          ) : (
            <ObjectInput value={editableValue as Record<string, string>} onChange={setEditableValue} />
          )
        ) : (
          <div>
            {typeof content.value === 'string' ? (
              <p>{content.value}</p>
            ) : Array.isArray(content.value) ? (
              <ul className="list-disc pl-5">
                {content.value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <dl className="grid grid-cols-3 gap-1">
                {Object.entries(content.value).map(([key, val]) => (
                  <React.Fragment key={key}>
                    <dt className="font-semibold col-span-1">{key}:</dt>
                    <dd className="col-span-2">{val}</dd>
                  </React.Fragment>
                ))}
              </dl>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function SoapNotes({ initialNotes, onRefresh }: SoapNotesProps) {
  const [soapNotes, setSoapNotes] = useState<Record<string, SoapNote>>(initialNotes);
  const [editingSoap, setEditingSoap] = useState<Record<string, boolean>>(
    Object.keys(initialNotes).reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  const toggleEdit = (field: string) => {
    setEditingSoap(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSoapChange = (field: string, value: any) => {
    setSoapNotes(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: value
      }
    }));
    toggleEdit(field); // Toggle editing after saving
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">SOAP Notes</h2>
        <Button onClick={(e) => {
          e.preventDefault();
          onRefresh();
        }} variant="outline">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh Notes
        </Button>
      </div>
      {Object.entries(soapNotes).map(([key, value]) => (
        <EditableCard
          key={key}
          id={key}
          title={value.title}
          content={value}
          onEdit={() => toggleEdit(key)}
          isEditing={editingSoap[key]}
          onSave={handleSoapChange}
        />
      ))}
    </div>
  );
}
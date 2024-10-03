import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Edit, Check } from "lucide-react";

export default function EditableCard({
  title,
  content,
  onEdit,
  isEditing,
  onSave,
}: {
  title: string;
  content: string;
  onEdit: () => void;
  isEditing: boolean;
  onSave: (value: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button
          onClick={isEditing ? () => onSave(content) : onEdit}
          variant="outline"
          size="sm"
        >
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
  );
}

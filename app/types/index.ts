export interface Note {
  id: string;
  content: string;
  position: { x: number; y: number };
  color: NoteColor;
  zIndex: number;
  width: number;
  height: number;
}

export type NoteColor = "yellow" | "blue" | "green" | "pink" | "purple";

export interface BoardContextType {
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "zIndex">) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  bringToFront: (id: string) => void;
}

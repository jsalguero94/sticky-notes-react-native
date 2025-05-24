import React, { createContext, useState, useEffect, useCallback } from "react";
import { Note, BoardContextType } from "../types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

// Default note colors
export const noteColors = ["yellow", "blue", "green", "pink", "purple"];

// Create context with default values
export const BoardContext = createContext<BoardContextType>({
  notes: [],
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  bringToFront: () => {},
});

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from AsyncStorage on mount
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem("notes");
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error("Failed to load notes from storage:", error);
      }
    };
    loadNotes();
  }, []);

  // Save notes to AsyncStorage whenever they change
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem("notes", JSON.stringify(notes));
      } catch (error) {
        console.error("Failed to save notes to storage:", error);
      }
    };
    saveNotes();
  }, [notes]);

  // Add a new note with a unique ID
  const addNote = useCallback((note: Omit<Note, "id" | "zIndex">) => {
    const newNote: Note = {
      ...note,
      id: uuid.v4() as string, // <-- use uuid.v4() and cast to string
      zIndex: Date.now() % 10000,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }, []);

  // Update an existing note
  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, ...updates } : note,
      ),
    );
  }, []);

  // Delete a note
  const deleteNote = useCallback((id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }, []);

  // Bring a note to the front
  const bringToFront = useCallback((id: string) => {
    setNotes((prevNotes) => {
      const highestZIndex =
        Math.max(...prevNotes.map((note) => note.zIndex)) + 1;
      return prevNotes.map((note) =>
        note.id === id ? { ...note, zIndex: highestZIndex } : note,
      );
    });
  }, []);

  return (
    <BoardContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, bringToFront }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => React.useContext(BoardContext);

import React from 'react';
import { Button, Flex, Input, Box, FormLabel } from '@chakra-ui/react';
import * as XLSX from 'xlsx';
import { NoteProps, useNoteStore } from '../store/noteStore';

const NotesExportImport: React.FC = () => {
  const notes = useNoteStore((state) => state.notes);
  const importNotes = useNoteStore((state) => state.importNotes);

  const handleExportJSON = () => {
    const exportData = JSON.stringify(notes);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(notes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Notes');
    XLSX.writeFile(workbook, 'notes-export.xlsx');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (extension === 'json') {
          const importedNotes = JSON.parse(event.target?.result as string) as [NoteProps];
          importNotes(importedNotes)
        } else if (extension === 'xlsx') {
          const workbook = XLSX.read(event.target?.result as string, { type: 'binary' });
          const importedNotes = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as [NoteProps];
          importNotes(importedNotes)
        } else {
          alert('Unsupported file format');
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <Box>
      <Flex direction={"column"} align="center" justifyContent="space-between">
          <FormLabel htmlFor="importfile">Import Notes Below (.json/.xls)</FormLabel>
          <Input id="importfile" type="file" accept=".json, .xlsx" onChange={handleFileChange} mb={2}/>
      </Flex>
      <Flex direction="row" align="center" justifyContent="space-between" mt={2}>
        <Button onClick={handleExportJSON} colorScheme="teal" size="sm" mb={2}>
          Export (.json)
        </Button>
        <Button onClick={handleExportExcel} colorScheme="teal" size="sm" mb={2}>
          Export (.xls)
        </Button>
      </Flex>
    </Box>
  );
};

export default NotesExportImport;

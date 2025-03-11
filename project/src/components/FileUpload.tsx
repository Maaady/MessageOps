import React, { useCallback, useState } from 'react';
import { Upload, CheckCircle, XCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { validatePhoneNumber } from '../lib/phoneUtils';

interface FileUploadProps {
  onUpload: (numbers: { number: string; isValid: boolean; formatted: string }[]) => void;
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [validating, setValidating] = useState(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setValidating(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        // Extract and validate phone numbers
        const validatedNumbers = json.map((row: any) => {
          const number = Object.values(row)[0].toString();
          const { isValid, formatted } = validatePhoneNumber(number);
          return { number, isValid, formatted };
        });

        onUpload(validatedNumbers);
      } catch (error) {
        console.error('Error processing file:', error);
      } finally {
        setValidating(false);
      }
    };

    reader.readAsBinaryString(file);
  }, [onUpload]);

  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {validating ? (
            <>
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mb-3" />
              <p className="mb-2 text-sm text-gray-500">Validating phone numbers...</p>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">CSV or Excel files</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
          disabled={validating}
        />
      </label>
    </div>
  );
}
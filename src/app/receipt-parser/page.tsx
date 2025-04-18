'use client';

import {useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {parseReceiptData} from "@/ai/flows/parse-receipt";

export default function ReceiptParser() {
  const [image, setImage] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleParseReceipt = async () => {
    if (image) {
      const data = await parseReceiptData({image});
      setParsedData(data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Receipt Parser</CardTitle>
          <CardDescription>Upload a receipt image to automatically extract data.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Input type="file" accept="image/*" onChange={handleImageUpload}/>

          {image && (
            <div className="flex flex-col items-center">
              <img src={image} alt="Receipt" className="max-w-full h-auto"/>
              <Button onClick={handleParseReceipt}>Parse Receipt</Button>
            </div>
          )}

          {parsedData && (
            <div className="mt-4">
              <h2>Parsed Data:</h2>
              <pre>{JSON.stringify(parsedData, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


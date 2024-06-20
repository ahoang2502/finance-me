import React from "react";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();
  const { triggerPaywall, shouldBlock } = usePaywall();

  if (shouldBlock) {
    return (
      <Button
        variant="primaryCyan"
        size="sm"
        className="w-full lg:w-auto"
        onClick={triggerPaywall}
      >
        <Upload className="size-4 mr-2" /> Import
      </Button>
    );
  }

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          variant="primaryCyan"
          size="sm"
          className="w-full lg:w-auto"
          {...getRootProps()}
        >
          <Upload className="size-4 mr-2" /> Import
        </Button>
      )}
    </CSVReader>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  totalItems: number;
  onPrev: () => void;
  onNext: () => void;
}

export function TransactionsPagination(props: Props) {
  if (props.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {props.page} of {props.totalPages} ({props.totalItems} results)
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={props.onPrev} disabled={props.page === 1}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={props.onNext}
          disabled={props.page === props.totalPages}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

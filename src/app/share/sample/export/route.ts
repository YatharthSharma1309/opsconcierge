import { NextResponse } from "next/server";
import { demoShortlistCsv } from "@/lib/recruitment/demo-sample";

export function GET() {
  return new NextResponse(demoShortlistCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="harbor-full-stack-engineer.csv"',
    },
  });
}

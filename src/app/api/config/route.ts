import { NextResponse } from "next/server";
import { getAIEngineRegistry } from "@/infrastructure/di/container";

export async function GET() {
  const engines = getAIEngineRegistry().getEnabledEngineNames();
  return NextResponse.json({ enabledEngines: engines });
}

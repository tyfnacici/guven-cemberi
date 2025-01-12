import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_VIRUS_TOTAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const headers = {
      "x-apikey": apiKey,
      accept: "application/json",
      "User-Agent": "vtscan v.1.0",
    };

    const virusTotalFormData = new FormData();
    const fileBuffer = await file.arrayBuffer();
    virusTotalFormData.append("file", new Blob([fileBuffer]), file.name);

    const uploadResponse = await fetch(
      "https://www.virustotal.com/api/v3/files",
      {
        method: "POST",
        body: virusTotalFormData,
        headers: headers,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Upload failed:", errorText);
      return NextResponse.json(
        { error: "File upload failed" },
        { status: uploadResponse.status }
      );
    }

    const uploadData = await uploadResponse.json();
    const analysisId = uploadData.data.id;
    console.log("File uploaded. Analysis ID:", analysisId);

    let analysisResponse;
    let attempts = 0;
    const maxAttempts = 10;
    const delay = 10000;

    while (attempts < maxAttempts) {
      analysisResponse = await fetch(
        `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
        {
          headers: headers,
        }
      );

      if (!analysisResponse.ok) {
        const errorText = await analysisResponse.text();
        console.error("Analysis fetch failed:", errorText);
        return NextResponse.json(
          { error: "Failed to fetch analysis results" },
          { status: analysisResponse.status }
        );
      }

      const analysisData = await analysisResponse.json();
      const status = analysisData.data.attributes.status;

      if (status === "completed") {
        console.log("Analysis completed:", analysisData);
        return NextResponse.json(analysisData);
      } else if (status === "queued" || status === "in-progress") {
        attempts++;
        console.log(`Analysis in progress. Attempt ${attempts}/${maxAttempts}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Analysis failed:", status);
        return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
      }
    }

    console.error("Analysis took too long");
    return NextResponse.json(
      { error: "Analysis took too long" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

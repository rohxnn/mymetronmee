import { NextRequest, NextResponse } from 'next/server';
import { Buffer } from 'buffer';


export async function POST(req: any) {
  try {
    const { instrument, chords } = await req.json();
    console.log('hiii')
    // Validate input to ensure instrument and chords are provided
    if (!instrument || !chords) {
      return NextResponse.json(
        { error: 'Instrument and chords are required.' },
        { status: 400 }
      );
    }

    // Construct the prompt for the Riffusion model.
    // The Riffusion model expects 'prompt_a'.
    // You can make this prompt more descriptive for better results.
    const promptText = `${instrument} with chords ${chords}, a mellow and flowing tune`;

    if (!process.env.HF_API_TOKEN) {
      return NextResponse.json(
        { error: 'Hugging Face API token not configured.' },
        { status: 500 }
      );
    }

    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/facebook/musicgen-small",
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` },
        method: "POST",
        body: JSON.stringify({ inputs: promptText }),
      }
    );

    if (!hfResponse.ok) {

      // const errorData = await hfResponse.json();
      // console.error('Hugging Face API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate music from Hugging Face API.' },
        { status: hfResponse.status }
      );
    }

    const audioBlob = await hfResponse.blob();
    const audioBuffer = await audioBlob.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    const audioUrl = `data:${audioBlob.type};base64,${base64Audio}`;

    console.log('Music generated successfully from Hugging Face.');
    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error('Error generating music:', error);
    return NextResponse.json(
      { error: 'Failed to generate music. Please try again.' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';

// Map of your PDF files on ImageKit
const PDF_MAP = {
  'indian-pregnancy-guide': 'https://ik.imagekit.io/go1sjrvux/indian-pregnancy-guide.pdf?updatedAt=1758812299293',
  // Add more PDFs as needed:
  // 'another-pdf': 'https://ik.imagekit.io/go1sjrvux/another.pdf?updatedAt=...',
  // 'sample-document': 'https://ik.imagekit.io/go1sjrvux/sample.pdf?updatedAt=...',
};

export async function GET(request, { params }) {
  try {
    const { path: pdfPath } = params;
    
    // Extract the PDF key from the path parameters
    const pdfKey = Array.isArray(pdfPath) ? pdfPath.join('/') : pdfPath;
    
    console.log('Requested PDF key:', pdfKey);
    console.log('Available PDFs:', Object.keys(PDF_MAP));
    
    // Get the ImageKit URL from the map
    const imageKitUrl = PDF_MAP[pdfKey];
    
    if (!imageKitUrl) {
      return NextResponse.json(
        { error: 'PDF not found. Available PDFs: ' + Object.keys(PDF_MAP).join(', ') }, 
        { status: 404 }
      );
    }
    
    console.log('Fetching from ImageKit:', imageKitUrl);
    
    // Fetch the PDF from ImageKit
    const response = await fetch(imageKitUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
    }
    
    // Get the PDF buffer
    const pdfBuffer = await response.arrayBuffer();
    
    // Get filename for Content-Disposition
    const filename = `${pdfKey}.pdf`;
    
    // Return PDF response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600, s-maxage=7200',
        'X-Content-Type-Options': 'nosniff',
      },
    });
    
  } catch (error) {
    console.error('Error serving PDF:', error);
    
    // Return appropriate error response
    if (error.message.includes('Failed to fetch')) {
      return NextResponse.json(
        { error: 'Failed to fetch PDF from storage' },
        { status: 502 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to serve PDF' },
      { status: 500 }
    );
  }
}

// Optional: Add HEAD method to check if PDF exists without downloading
export async function HEAD(request, { params }) {
  try {
    const { path: pdfPath } = params;
    const pdfKey = Array.isArray(pdfPath) ? pdfPath.join('/') : pdfPath;
    
    const imageKitUrl = PDF_MAP[pdfKey];
    
    if (!imageKitUrl) {
      return new NextResponse(null, { status: 404 });
    }
    
    // Check if the PDF exists by making a HEAD request
    const response = await fetch(imageKitUrl, { method: 'HEAD' });
    
    if (!response.ok) {
      return new NextResponse(null, { status: 404 });
    }
    
    const filename = `${pdfKey}.pdf`;
    
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Content-Length': response.headers.get('content-length') || '0',
        'Cache-Control': 'public, max-age=3600',
        'X-PDF-Available': 'true',
      },
    });
    
  } catch (error) {
    console.error('Error checking PDF:', error);
    return new NextResponse(null, { status: 500 });
  }
}
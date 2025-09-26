import { NextResponse } from 'next/server';

const PDF_MAP = {
  'indian-pregnancy-guide': 'https://ik.imagekit.io/go1sjrvux/indian-pregnancy-guide.pdf?updatedAt=1758812299293',
  'baby-care-guide': 'https://ik.imagekit.io/go1sjrvux/baby-care-guide.pdf?updatedAt=1758812299294',
  'nutrition-plan': 'https://ik.imagekit.io/go1sjrvux/nutrition-plan.pdf?updatedAt=1758812299295',
};

export async function GET() {
  try {
    const pdfList = Object.keys(PDF_MAP).map(key => ({
      id: key,
      url: `/api/pdf/${key}`,
      filename: `${key}.pdf`,
    }));
    
    return NextResponse.json({
      count: pdfList.length,
      pdfs: pdfList,
    });
    
  } catch (error) {
    console.error('Error listing PDFs:', error);
    return NextResponse.json(
      { error: 'Failed to list PDFs' },
      { status: 500 }
    );
  }
}
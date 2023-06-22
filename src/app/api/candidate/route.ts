import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest){
 const { searchParams } = new URL(req.url);
  const admissionNo = searchParams.get("admissionNo");
  try {
    const data = await prisma.student.findUnique({
      where: { admissionNo },
      include: {
        votes: true,
        candidate: true
      },
    });
    return NextResponse.json(data.candidate)
  }
  catch(err){
    return NextResponse.json({"err"}, {status: 500})
  }
}

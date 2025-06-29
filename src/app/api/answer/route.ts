import { NextRequest, NextResponse } from "next/server";
import { answerCollection, db } from "@/models/name";
import { ID } from "node-appwrite";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
export async function POST(request: NextRequest) {
  try {
    const { questionId, answer, authorId } = await request.json();

    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        authorId: authorId,
        questionId: questionId,
      }
    );
    //INCREASE AUTHOR REPUTATION
    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs(authorId, {
      repuatation: Number(prefs.reputation) + 1,
    });
    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.message || "An error occurred while processing your request.",
      },
      {
        status: error?.status || error?.code || 500,
      }
    );
  }
}

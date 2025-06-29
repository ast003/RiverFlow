import { IndexType, Permission } from "node-appwrite";
import { db, questioncollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
  //create collection
  await databases.createCollection(db, questioncollection, "questions", [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Question collection created successfully");
  await Promise.all([
    databases.createStringAttribute(db, questioncollection, "title", 255, true),
    databases.createStringAttribute(
      db,
      questioncollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      db,
      questioncollection,
      "authorId",
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      questioncollection,
      "tags",
      50,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      questioncollection,
      "attachmentId",
      50,
      false
    ),
  ]);
  console.log("Question collection attributes created successfully");
  //   await Promise.all([
  //     databases.createIndex(
  //       db,
  //       questioncollection,
  //       "title",
  //       IndexType.Fulltext,
  //       ["title"],
  //       ["asc"]
  //     ),
  //     databases.createIndex(
  //       db,
  //       questioncollection,
  //       "content",
  //       IndexType.Fulltext,
  //       ["content"],
  //       ["asc"]
  //     ),
  //   ]);
}

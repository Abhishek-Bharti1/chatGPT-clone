import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseadmin";

type Data = {
  answer: string;
};

type Message = {
  text: string;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  // Validate required fields
  if (!prompt) {
    res.status(400).json({ answer: "Prompt is required!" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ answer: "Please, provide a valid ChatId!" });
    return;
  }
  if (!session || !session.user || !session.user.email) {
    res.status(400).json({ answer: "Session is required and must include a valid user email!" });
    return;
  }

  const userEmail = session.user.email;

  try {
    // ChatGPT Query
    const response = await query(prompt, chatId, model);

    const message: Message = {
      text: response || "ChatGPT was unable to find an answer for that!",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar: "",
      },
    };

    // Add message to Firestore
    await adminDb
      .collection("users")
      .doc(userEmail)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    // Send response
    res.status(200).json({ answer: message.text });
  } catch (error) {
    console.error("Error adding message to Firestore:", error);
    res.status(500).json({ answer: "Internal server error" });
  }
}





import { firestore } from "..";

export const addWaitListUser = async (
  email: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  if (!email || !firestore)
    return {
      success: false,
      message: "No email provided",
    };
  try {
    const userDoc = await firestore()
      .collection("waitlist")
      .where("email", "==", email)
      .get();

    if (!userDoc.empty) {
      return {
        message: "User already in waitlist",
        success: true,
      };
    }
    await firestore().collection("waitlist").add({ email });
    return {
      message: "User added to waitlist",
      success: true,
    };
  } catch (err: any) {
    return {
      message: "Error adding user to waitlist",
      success: false,
    };
  }
};

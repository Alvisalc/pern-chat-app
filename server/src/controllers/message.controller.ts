import { Request, Response } from "express"; // types from express
import prisma from "../db/prisma.js";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        // get message
        const { message } = req.body;
        // get receiver  ID
        const { id:receiverId } = req.params;
        // get sender ID from authenticated user
        const senderId = req.user.id;

        // find an existing conversation between the sender and receiver
        let conversation = await prisma.conversation.findFirst({
            where:{
                participantIds: {
                    hasEvery: [senderId, receiverId],
                }
            }
        })
        // if no, create a new one
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data:{
                    participantIds:{
                        set: [senderId, receiverId]
                    }
                }
            })
        }

        // create new message in the conversation
        const newMessage = await prisma.message.create({
			data: {
				senderId,
				body: message,
				conversationId: conversation.id,
			},
		});
        // update conversation with the new message
		if (newMessage) {
			conversation = await prisma.conversation.update({
				where: {
					id: conversation.id,
				},
				data: {
					messages: {
						connect: {
							id: newMessage.id,
						},
					},
				},
			});
		}

        // socket io will be added here

        // respond with the latest created message
        res.status(201).json(newMessage);

    } catch (error: any) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getMessage = async (req: Request, res: Response) => {
    try {
        // get user id to chatroom
        const {id:userToChatId} = req.params;
        // get sender id from the authenicated user
        const senderId = req.user.id;

        // find the conversation between sender and specified user
        const conversation = await prisma.conversation.findFirst({
            where:{
                participantIds:{
                    hasEvery:[senderId, userToChatId]
                }
            },
            include:{
                messages: {
                    orderBy:{
                        createdAt: "asc",
                    },
                },
            },
        });

        // if no conversation, respond with empty arry
        if (!conversation) {
            return res.status(200).json([]);
        }

        // respond with message in found conversation
        res.status(200).json(conversation.messages);

    } catch (error: any) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const getUsersForSidebar = async (req: Request, res: Response) => {
	try {
        // get authenticated user ID from request
		const authUserId = req.user.id;
        // find all users except the authenticated user
		const users = await prisma.user.findMany({
			where: {
				id: {
					not: authUserId,
				},
			},
			select: {
				id: true,
				fullName: true,
				profilePic: true,
			},
		});
        // respond with the found users
		res.status(200).json(users);
	} catch (error: any) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
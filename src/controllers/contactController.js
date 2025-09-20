import prisma from "../lib/prisma.js";

export const postContact = async (req, res) => {
  // console.log(req.body);
  // return;
  const { name, email, phone, category, subject, message } = req.body;
  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        category,
        subject,
        message,
      },
    });
    res.status(201).json({
      message: "Contact created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating contact",
      error: error.message,
    });
  }
};

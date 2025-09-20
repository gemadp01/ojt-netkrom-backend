import Contact from "../models/Contact.js";

export const postContact = async (req, res) => {
  try {
    const { name, email, phone, category, subject, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      category,
      subject,
      message,
    });

    await newContact.save();

    res.status(201).json({
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating contact",
      error: error.message,
    });
  }
};

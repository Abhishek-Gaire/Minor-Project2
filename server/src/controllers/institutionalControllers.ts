import { RequestHandler, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { CustomError } from "../exceptions/customError";
import { generatePassword } from "../utils/password";
import { createMailOptions, sendEmail } from "../config/nodemailerConfig";

dotenv.config();

import prisma from "../config/dbConfig";

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const frontendLink = process.env.FRONTEND_URL as string;

export const registerInstitutionHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, contactPerson, role, email, phone, address, city, imageUrl } =
    req.body;

  const fileURL = `${SUPABASE_URL}/storage/v1/object/public/${imageUrl}`;

  try {
    const school = await prisma.school.create({
      data: {
        schoolName: name,
        schoolAddress: address,
        city,
        role,
        contact: contactPerson,
        email,
        phone,
        imageUrl: fileURL, // Store the full image URL
      },
    });
    if (!school) {
      res.status(400).json({
        success: false,
        message: "Failed to add school",
      });
      return;
    }

    const password = generatePassword();
    const subject = "Your School was Added Successfully. This is your password";
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>School Registration Success</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background-color: #4CAF50;
            padding: 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
            line-height: 1.6;
          }
          .content h2 {
            color: #4CAF50;
            font-size: 20px;
            margin-top: 0;
          }
          .content p {
            margin: 10px 0;
          }
          .password-box {
            background-color: #e8f5e9;
            border: 1px solid #c8e6c9;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #2e7d32;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin: 10px 0;
          }
          .button:hover {
            background-color: #45a049;
          }
          .footer {
            background-color: #f1f1f1;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          @media only screen and (max-width: 600px) {
            .container {
              margin: 10px;
            }
            .content {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Our School Platform!</h1>
          </div>
          <div class="content">
            <h2>School Registration Successful</h2>
            <p>Congratulations! Your school has been successfully added to our platform. You can now log in to manage your school's profile and access all features.</p>
            <p>Your login password is provided below. Please keep it safe and do not share it with others.</p>
            <div class="password-box">
              Password: ${password}
            </div>
            <p>Click the button below to log in to your account:</p>
            <a href="${frontendLink}/admin/login" class="button">Log In Now</a>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p><a href="${frontendLink}/admin/login">${frontendLink}/admin/login</a></p>
          </div>
          <div class="footer">
            <p>&copy; 2025 School Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = createMailOptions(email, subject, html);
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminData = {
      name: contactPerson,
      email,
      password: hashedPassword,
      schoolId: school.id,
    };

    const admin = await prisma.admin.create({
      data: adminData,
    });
    if (!admin) {
      throw new CustomError("Failed to create admin", 500);
    }

    const emailSent = await sendEmail(mailOptions);
    if (!emailSent) {
      throw new CustomError("Failed to send email", 500);
    }

    res.status(201).json({
      success: true,
      message: "School Added Successfully",
      data: school,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllInstitutionHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schools = await prisma.school.findMany({
      select: {
        id: true,
        schoolName: true,
        schoolAddress: true,
        imageUrl: true,
      },
    });
    if (!schools) {
      throw new CustomError("No schools found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Schools fetched successfully",
      data: schools,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getInstitutionByIdHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const school = await prisma.school.findUnique({
      where: {
        id: id,
      },
    });
    if (!school) {
      throw new CustomError("School not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "School fetched successfully",
      data: school,
    });
    return;
  } catch (error: any) {
    next(error);
  }
};

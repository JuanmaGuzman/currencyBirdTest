import { Router, Request, Response } from "express";
import Transfer, { ITransfer } from "../models/Transfer";
import axios, { AxiosResponse } from "axios";
import * as dotenv from 'dotenv';

const router = Router();

dotenv.config();
const GP_TOKEN_URL = process.env.GP_TOKEN_URL || "default_value_if_undefined";
const GENERAL_PAYMENT_URL = process.env.GENERAL_PAYMENT_URL || "default_value_if_undefined";

interface TransferApiResponse {
  amount: string;
  email: string;
  retries: number;
  transferCode: string;
  // Add more properties as needed to match the actual API response.
}

const createTransfer = async (
  transferCode: string,
  amount: number,
  authToken: string,
): Promise<AxiosResponse<TransferApiResponse>> => {
  try {
    // Make an API request to create the transfer
    const transferRequestBody = {
      transferCode,
      amount,
    };

    const headers = {
      Authorization: authToken,
    };

    const externalApiResponse = await axios.post<TransferApiResponse>(
      GENERAL_PAYMENT_URL,
      transferRequestBody,
      { headers },
    );

    // Log a success message
    console.log("External API call successful.");

    return externalApiResponse;
  } catch (error) {
    // Handle errors and log them
    console.error("Error calling external API:", error);
    throw new Error("Error calling the external API.");
  }
};

const getToken = async () => {
  try {
    // Call the token API to retrieve an authorization token
    const tokenApiResponse = await axios.get(GP_TOKEN_URL);

    if (tokenApiResponse.data) {
      // Log the token data
      console.log("Received authorization token:", tokenApiResponse.data);
      return tokenApiResponse.data;
    } else {
      // Handle unexpected response status
      console.error(
        "Unexpected response status when retrieving the token:",
        tokenApiResponse.status,
      );
    }
  } catch (error) {
    // Handle errors and log them
    console.error("Error retrieving the authorization token:", error);
  }
};


router.post("/create-money-transfer", async (req: Request, res: Response) => {
  const { transferCode, amount } = req.body;

  console.log("Received transfer code:", transferCode);
  console.log("Received amount:", amount);

  try {
    // Check if the transferCode already exists in the local database
    const existingTransferInLocal = await Transfer.findOne({ transferCode });

    if (existingTransferInLocal) {
      // Send an error response if the transferCode already exists
      return res
        .status(400)
        .json({ error: "This transfer has already been completed." });
    }

    // Obtain the authorization token
    const authToken = await getToken();
    const externalApiResponse = await createTransfer(
      transferCode,
      amount,
      authToken,
    );

    // Check if the response from the external API is valid
    if (externalApiResponse.data) {
      // Create a new transfer with the current date
      const newTransfer: ITransfer = new Transfer({
        transferCode,
        amount,
        date: new Date(),
      });

      try {
        // Save the new transfer in the local database
        const savedTransfer = await newTransfer.save();
        // Log a success message
        console.log("Transfer saved in the local database.");
        // Return the created transfer
        res.status(201).json(savedTransfer);
      } catch (error) {
        // Handle errors when saving to the local database
        res
          .status(500)
          .json({ error: "Error saving the transfer in the local database." });
      }
    } else {
      // Handle errors when the external API response is not valid
      res
        .status(400)
        .json({ error: "Error creating the transfer in the external API." });
    }
  } catch (error) {
    // Handle errors related to checking the local database
    res
      .status(500)
      .json({
        error:
          "Error verifying the existence of the transfer in the local database.",
      });
  }
});

export default router;


// const checkTransferExistence = async (authToken: string) => {
//   try {
//     const headers = {
//       Authorization: authToken,
//     };

//     // Call the API to check if a transfer exists for a specific ID.
//     const response = await axios.get(GENERAL_PAYMENT_URL, { headers });

//     if (response.data) {
//       // Log the transfer existence status
//       console.log(
//         "Transfer exists for the specific transferCode:",
//         response.data,
//       );
//       return response.data;
//     } else {
//       // Handle unexpected response status or missing existence data
//       console.error(
//         "Unexpected response status or missing existence data when checking transfer:",
//         response.status,
//       );
//     }
//   } catch (error) {
//     // Handle errors and log them
//     console.error("Error checking transfer existence:", error);
//     throw new Error("Failed to check transfer existence");
//   }
// };
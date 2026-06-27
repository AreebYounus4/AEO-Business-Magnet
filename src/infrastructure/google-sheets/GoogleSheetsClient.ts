import { google, type sheets_v4 } from "googleapis";
import { getEnv } from "../config/env";
import { GoogleSheetsError } from "@/lib/errors/GoogleSheetsError";
import { normalizePrivateKey } from "@/lib/utils/google-key";

export class GoogleSheetsClient {
  private sheets: sheets_v4.Sheets | null = null;

  private getClient(): sheets_v4.Sheets {
    if (this.sheets) return this.sheets;

    const env = getEnv();
    if (
      !env.GOOGLE_SHEET_ID ||
      !env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    ) {
      throw new GoogleSheetsError("Google Sheets is not configured.");
    }

    const auth = new google.auth.JWT({
      email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: normalizePrivateKey(env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth });
    return this.sheets;
  }

  get sheetId(): string {
    return getEnv().GOOGLE_SHEET_ID;
  }

  async appendRow(sheetName: string, values: (string | number | boolean)[]): Promise<void> {
    try {
      const client = this.getClient();
      await client.spreadsheets.values.append({
        spreadsheetId: this.sheetId,
        range: `${sheetName}!A:Z`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [values],
        },
      });
    } catch (error) {
      throw new GoogleSheetsError("Failed to write to Google Sheets.", error);
    }
  }

  async updateRowByScanId(
    sheetName: string,
    scanId: string,
    scanIdColumn: number,
    values: (string | number | boolean)[],
  ): Promise<void> {
    try {
      const client = this.getClient();
      const response = await client.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: `${sheetName}!A:Z`,
      });

      const rows = response.data.values ?? [];
      const rowIndex = rows.findIndex(
        (row) => row[scanIdColumn] === scanId,
      );

      if (rowIndex < 0) {
        await this.appendRow(sheetName, values);
        return;
      }

      const range = `${sheetName}!A${rowIndex + 1}:Z${rowIndex + 1}`;
      await client.spreadsheets.values.update({
        spreadsheetId: this.sheetId,
        range,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [values],
        },
      });
    } catch (error) {
      if (error instanceof GoogleSheetsError) throw error;
      throw new GoogleSheetsError("Failed to update Google Sheets.", error);
    }
  }

  async findRows(sheetName: string): Promise<string[][]> {
    try {
      const client = this.getClient();
      const response = await client.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: `${sheetName}!A:Z`,
      });
      return (response.data.values ?? []).slice(1);
    } catch (error) {
      throw new GoogleSheetsError("Failed to read from Google Sheets.", error);
    }
  }
}

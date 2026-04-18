/**
 * Bitrix24 REST API Client (Vanilla implementation)
 */

const PORTAL = "1977likeit.bitrix24.ru";
const CLIENT_ID = process.env.BITRIX_CLIENT_ID;
const CLIENT_SECRET = process.env.BITRIX_CLIENT_SECRET;

export interface BitrixSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
  domain: string;
}

export class BitrixClient {
  private session: BitrixSession | null = null;

  constructor(session?: BitrixSession) {
    if (session) this.session = session;
  }

  /**
   * Get Authorization URL
   */
  static getAuthUrl(redirectUri: string) {
    return `https://${PORTAL}/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  /**
   * Exchange Code for Token
   */
  static async exchangeCode(code: string, redirectUri: string): Promise<BitrixSession> {
    const res = await fetch(`https://oauth.bitrix.info/oauth/token/?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`);
    const data = await res.json();

    if (data.error) throw new Error(data.error_description || data.error);

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
      userId: data.user_id.toString(),
      domain: data.domain,
    };
  }

  /**
   * Call REST Method
   */
  async call(method: string, params: Record<string, any> = {}) {
    if (!this.session) {
      // If no session, fallback to Webhook if available (system-wide requests)
      const WEBHOOK_URL = "https://1977likeit.bitrix24.ru/rest/1/bt2z4jtdry36b1m2";
      const res = await fetch(`${WEBHOOK_URL}/${method}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      return res.json();
    }

    // Refresh token if expired (simplified for MVP)
    if (Date.now() > this.session.expiresAt) {
      // Token refreshing logic would go here
      console.warn("Bitrix token expired");
    }

    const url = `https://${this.session.domain}/rest/${method}.json?auth=${this.session.accessToken}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return res.json();
  }

  /**
   * Fetch Active Deals (Projects)
   */
  async getProjects() {
    const data = await this.call("crm.deal.list", {
      select: ["ID", "TITLE", "COMPANY_TITLE", "STAGE_ID", "ASSIGNED_BY_ID", "DATE_CREATE"],
      filter: { "CLOSED": "N" },
      order: { "DATE_CREATE": "DESC" },
    });
    return data.result || [];
  }

  /**
   * Fetch Active Tasks
   */
  async getTasks(userId?: string) {
    const params: any = {
      select: ["ID", "TITLE", "RESPONSIBLE_ID", "STATUS", "DEADLINE"],
      filter: { "ZOMBIE": "N" },
    };
    if (userId) params.filter.RESPONSIBLE_ID = userId;

    const data = await this.call("tasks.task.list", params);
    return data.result?.tasks || [];
  }

  /**
   * Fetch Leads
   */
  async getLeads() {
    const data = await this.call("crm.lead.list", {
      select: ["ID", "TITLE", "NAME", "LAST_NAME", "COMPANY_TITLE", "STATUS_ID", "DATE_CREATE"],
      order: { "DATE_CREATE": "DESC" },
      limit: 10,
    });
    return data.result || [];
  }
}

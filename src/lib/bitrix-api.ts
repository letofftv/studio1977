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
   * Refresh expired token
   */
  async refreshSession(): Promise<boolean> {
    if (!this.session?.refreshToken) return false;

    try {
      const res = await fetch(
        `https://oauth.bitrix.info/oauth/token/?grant_type=refresh_token&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${this.session.refreshToken}`
      );
      const data = await res.json();

      if (data.error) {
        console.error("Bitrix refresh error:", data.error_description || data.error);
        return false;
      }

      this.session = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: Date.now() + data.expires_in * 1000,
        userId: this.session.userId,
        domain: this.session.domain,
      };
      return true;
    } catch (err) {
      console.error("Bitrix refresh network error:", err);
      return false;
    }
  }

  /**
   * Get current (possibly refreshed) session
   */
  getSession(): BitrixSession | null {
    return this.session;
  }

  /**
   * Call REST Method
   */
  async call(method: string, params: Record<string, any> = {}): Promise<any> {
    if (!this.session) {
      // No session → use webhook for system-wide requests
      const WEBHOOK_URL = "https://1977likeit.bitrix24.ru/rest/1/bt2z4jtdry36b1m2";
      try {
        const res = await fetch(`${WEBHOOK_URL}/${method}.json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
          next: { revalidate: 60 }, // cache for 60s to avoid rate limits
        });
        return res.json();
      } catch (err) {
        console.error(`Bitrix Webhook Error (${method}):`, err);
        return { error: "NETWORK_ERROR", details: err };
      }
    }

    // Auto-refresh if token is close to expiring (within 5 minutes)
    if (Date.now() > this.session.expiresAt - 5 * 60 * 1000) {
      const refreshed = await this.refreshSession();
      if (!refreshed) {
        return { error: "AUTH_EXPIRED", details: "Token refresh failed" };
      }
    }

    const url = `https://${PORTAL}/rest/${method}.json?auth=${this.session.accessToken}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      
      const data = await res.json();
      
      if (data.error) {
        console.error(`Bitrix API Error (${method}):`, data.error_description || data.error);
        if (data.error === "expired_token" || data.error === "invalid_token") {
          // Try one more refresh
          const refreshed = await this.refreshSession();
          if (refreshed) {
            return this.call(method, params); // Retry with new token
          }
          return { error: "AUTH_EXPIRED", details: data.error };
        }
      }

      return data;
    } catch (err) {
      console.error(`Bitrix Network Error (${method}):`, err);
      return { error: "NETWORK_ERROR", details: err };
    }
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
   * Fetch Single Project (Deal)
   */
  async getProjectById(id: string) {
    const data = await this.call("crm.deal.get", {
      id: id
    });
    return data.result || null;
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
    // tasks.task.list structure can vary, but usually result.tasks
    const tasks = data.result?.tasks || (Array.isArray(data.result) ? data.result : []);
    return tasks;
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

  /**
   * Fetch Companies (Clients)
   */
  async getCompanies() {
    const data = await this.call("crm.company.list", {
      select: ["ID", "TITLE", "COMPANY_TYPE", "REVENUE", "DATE_CREATE"],
      order: { "DATE_CREATE": "DESC" },
    });
    return data.result || [];
  }

  /**
   * Fetch Users (Team)
   */
  async getUsers() {
    const data = await this.call("user.get", {
      filter: { "ACTIVE": "Y" },
    });
    return data.result || [];
  }
}

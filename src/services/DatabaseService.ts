import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

export interface Client {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface Invoice {
  id: number;
  clientId: number;
  amount: number;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  clientName?: string; // added for joined query
}

class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;
  private dbName = 'invoicecreator.db';

  async init(): Promise<void> {
    try {
      this.db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
      await this.db.open();

      // Create tables
      await this.createTables();
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    const clientTable = `
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        address TEXT NOT NULL
      );
    `;

    const invoiceTable = `
      CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clientId INTEGER NOT NULL,
        amount REAL NOT NULL,
        dueDate TEXT NOT NULL,
        status TEXT DEFAULT 'draft',
        FOREIGN KEY (clientId) REFERENCES clients (id)
      );
    `;

    await this.db.execute(clientTable);
    await this.db.execute(invoiceTable);
  }

  // Client operations
  async getClients(): Promise<Client[]> {
    if (!this.db) return [];
    const result = await this.db.query('SELECT * FROM clients');
    return result.values || [];
  }

  async addClient(client: Omit<Client, 'id'>): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');
    const result = await this.db.run('INSERT INTO clients (name, email, address) VALUES (?, ?, ?)', [client.name, client.email, client.address]);
    return result.changes?.lastId || 0;
  }

  async updateClient(client: Client): Promise<void> {
    if (!this.db) return;
    await this.db.run('UPDATE clients SET name = ?, email = ?, address = ? WHERE id = ?', [client.name, client.email, client.address, client.id]);
  }

  async deleteClient(id: number): Promise<void> {
    if (!this.db) return;
    await this.db.run('DELETE FROM clients WHERE id = ?', [id]);
  }

  // Invoice operations
  async getInvoices(): Promise<Invoice[]> {
    if (!this.db) return [];
    const result = await this.db.query(`
      SELECT invoices.*, clients.name as clientName
      FROM invoices
      JOIN clients ON invoices.clientId = clients.id
    `);
    return (result.values || []).map(row => ({
      id: row.id,
      clientId: row.clientId,
      amount: row.amount,
      dueDate: row.dueDate,
      status: row.status,
      clientName: row.clientName
    }));
  }

  async addInvoice(invoice: Omit<Invoice, 'id'>): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');
    const result = await this.db.run('INSERT INTO invoices (clientId, amount, dueDate, status) VALUES (?, ?, ?, ?)', [invoice.clientId, invoice.amount, invoice.dueDate, invoice.status]);
    return result.changes?.lastId || 0;
  }

  async updateInvoice(invoice: Invoice): Promise<void> {
    if (!this.db) return;
    await this.db.run('UPDATE invoices SET clientId = ?, amount = ?, dueDate = ?, status = ? WHERE id = ?', [invoice.clientId, invoice.amount, invoice.dueDate, invoice.status, invoice.id]);
  }

  async deleteInvoice(id: number): Promise<void> {
    if (!this.db) return;
    await this.db.run('DELETE FROM invoices WHERE id = ?', [id]);
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection(this.dbName, false);
    }
  }
}

export const dbService = new DatabaseService();
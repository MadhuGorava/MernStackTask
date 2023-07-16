import express from "express";
import sqlite3 from "sqlite3";

const app = express();
app.use(express.json());

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`CREATE TABLE invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoiceDate TEXT,
    invoiceNumber TEXT,
    invoiceAmount REAL
  )`);
});

app.post("/invoices", (req, res) => {
  const { invoiceDate, invoiceNumber, invoiceAmount } = req.body;

  db.get(
    "SELECT invoiceDate FROM invoices WHERE invoiceNumber < ? ORDER BY invoiceDate DESC LIMIT 1",
    invoiceNumber,
    (err, row) => {
      if (row && row.invoiceDate > invoiceDate) {
        return res.status(400).json({
          error:
            "Invalid invoiceDate. It should be greater than the previous invoice.",
        });
      }

      db.get(
        "SELECT invoiceDate FROM invoices WHERE invoiceNumber > ? ORDER BY invoiceDate ASC LIMIT 1",
        invoiceNumber,
        (err, row) => {
          if (row && row.invoiceDate < invoiceDate) {
            return res.status(400).json({
              error:
                "Invalid invoiceDate. It should be less than the next invoice.",
            });
          }

          db.run(
            "INSERT INTO invoices (invoiceDate, invoiceNumber, invoiceAmount) VALUES (?, ?, ?)",
            invoiceDate,
            invoiceNumber,
            invoiceAmount,
            function (err) {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Failed to insert invoice." });
              }

              return res.status(201).json({ id: this.lastID });
            }
          );
        }
      );
    }
  );
});

app.put("/invoices/:invoiceNumber", (req, res) => {
  const invoiceNumber = req.params.invoiceNumber;
  const { invoiceDate, invoiceAmount } = req.body;

  db.run(
    "UPDATE invoices SET invoiceDate = ?, invoiceAmount = ? WHERE invoiceNumber = ?",
    invoiceDate,
    invoiceAmount,
    invoiceNumber,
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to update invoice." });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Invoice not found." });
      }

      return res.sendStatus(204);
    }
  );
});

app.delete("/invoices/:invoiceNumber", (req, res) => {
  const invoiceNumber = req.params.invoiceNumber;

  db.run(
    "DELETE FROM invoices WHERE invoiceNumber = ?",
    invoiceNumber,
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to delete invoice." });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Invoice not found." });
      }

      return res.sendStatus(204);
    }
  );
});

app.get("/invoices", (req, res) => {
  db.all("SELECT * FROM invoices", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve invoices." });
    }

    return res.json(rows);
  });
});

app.get("/invoices/filter", (req, res) => {
  const { financialYear, invoiceNumber, startDate, endDate } = req.query;
  let query = "SELECT * FROM invoices WHERE 1=1";

  if (financialYear) {
    query += ` AND invoiceNumber LIKE '%${financialYear}%'`;
  }

  if (invoiceNumber) {
    query += ` AND invoiceNumber = '${invoiceNumber}'`;
  }

  if (startDate) {
    query += ` AND invoiceDate >= '${startDate}'`;
  }

  if (endDate) {
    query += ` AND invoiceDate <= '${endDate}'`;
  }

  db.all(query, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve filtered invoices." });
    }

    return res.json(rows);
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

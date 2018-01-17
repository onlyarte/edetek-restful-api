const express = require('express');
const mysql = require('mysql');
const path = require('path');

const router = express.Router();

const connection = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
});

// page for testing add & modify post requests
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'));
});

// return all departments
router.get('/all', (req, res) => {
  connection.query(
    'SELECT * FROM `departments`',
    (error, departments) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      res.send(departments);
    },
  );
});

// add a department
router.post('/new', (req, res) => {
  if (!req.body.id || !req.body.name) {
    res.sendStatus(500);
    return;
  }

  connection.query(
    'INSERT INTO departments SET ?',
    {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description || null,
    },
    (error) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    },
  );
});

// modify a department
router.post('/modify', (req, res) => {
  if (!req.body.id || !req.body.name) {
    res.sendStatus(500);
  }

  connection.query(
    `UPDATE departments 
    SET name = ?, description = ?
    WHERE id = ?`,
    [
      req.body.name,
      req.body.description || null,
      req.body.id,
    ],
    (error) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    },
  );
});

// return a department with the specified id
router.get('/:id', (req, res) => {
  connection.query(
    `SELECT * FROM departments 
    WHERE id = ?`,
    [req.params.id],
    (error, departments) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      res.send(departments[0] || {});
    },
  );
});

module.exports = router;

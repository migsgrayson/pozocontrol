const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'page'
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM pozo order by cabillero_asignado', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

exports.search = (req, res) => {
  const searchTerm = req.query.search;
  const month = req.query.month;
  let query = "SELECT * FROM pozo WHERE 1=1";
  let params = [];

  if (searchTerm) {
    query += " AND (cabillero_asignado LIKE ? OR id_pozo LIKE ?)";
    params.push('%' + searchTerm + '%', '%' + searchTerm + '%');
  }
  if (month) {
    query += " AND MONTH(fecha_fin) = ?";
    params.push(month);
  }

  query+= "order by cabillero_asignado"

  connection.query(query, params, (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
  });
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM pozo WHERE cabillero_asignado LIKE ? OR id_pozo LIKE ? or monthname(fecha_fin) LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('añada-pozo');
}

// Add new pozo
exports.create = (req, res) => {
  const { id_pozo, cabillero_asignado, fecha_fin, t_mudanza, tdo, t_total, t_mudanza_neto, tdo_neto, t_total_neto } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO pozo SET id_pozo = ?, cabillero_asignado = ?, fecha_fin = ?, t_mudanza = ?, tdo = ?, t_total = ?, t_mudanza_neto = ?, tdo_neto = ?, t_total_neto = ?', [id_pozo, cabillero_asignado, fecha_fin, t_mudanza, tdo, t_total, t_mudanza_neto, tdo_neto, t_total_neto], (err, rows) => {
    if (!err) {
      res.render('añada-pozo', { alert: 'Pozo añadido de manera correcta.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM pozo WHERE id_pozo = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('editar-pozo', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { id_pozo, cabillero_asignado, fecha_fin, t_mudanza, tdo, t_total, t_mudanza_neto, tdo_neto, t_total_neto } = req.body;
  // User the connection
  connection.query('UPDATE pozo SET id_pozo = ?, cabillero_asignado = ?, fecha_fin = ?, t_mudanza = ?, tdo = ?, t_total = ?, t_mudanza_neto = ?, tdo_neto = ?, t_total_neto = ?', [id_pozo, cabillero_asignado, fecha_fin, t_mudanza, tdo, t_total, t_mudanza_neto, tdo_neto, t_total_neto], (err, rows) => {
    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${id_pozo} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  connection.query('DELETE FROM pozo WHERE id_pozo = ?', [req.params.id], (err, rows) => {

     if(!err) {
       res.redirect('/');
     } else {
       console.log(err);
     }
     console.log('The data from user table: \n', rows);

   });

  // Hide a record
/*
  connection.query('UPDATE pozo SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });
*/
}
// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM pozo WHERE id_pozo = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('ver-pozo', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}

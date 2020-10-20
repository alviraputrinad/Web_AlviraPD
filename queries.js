const { Pool, Client } = require('pg')
const connectionString = 'postgresspql://postgres:032001Maret@localhost:5432/MyDatabase'

const pool = new Pool({
    connectionString: connectionString,
  })

  const getBerita = (request, response) => {
    pool.query('SELECT * FROM news where id > 0', (err, res) => {
        if (err) {
            throw err
          }
          console.log(res)
          // response.status(200).send({
          //   data : 'data'
          // })
        })
  }
    const updateBerita = (req,res) => {
      let vtabel = null
      let ntabel = null
      console.log(req.body.judul_berita)
      
      if(req.body.judul_berita != ''){
        vtabel = "'"+req.body.judul_berita+"'";
        ntabel = 'judul_berita'
      }else if( req.body.konten != ''){
        vtabel = "'"+req.body.konten+"'"
        ntabel = 'konten'
      }else if(req.body.kategori != ''){
        vtabel = "'"+req.body.kategori+"'"
        ntabel = 'kategori'
      }
      const value = [vtabel, ntabel, req.body.id]
      let text = 'UPDATE news SET '+ ntabel + ' = ' + vtabel + ' WHERE id = '+ req.body.id;
      pool.query(text, (err,res)=> {
        if (err) {
          console.log(err.stack)
      }
      })
      console.log(text)
      //pool.query()
    }
     
    const deleteBerita = (req,res) => {
      console.log(req.body.id)
      const text = 'DELETE FROM news WHERE id = ($1)'
      const value = [req.body.id]

        pool.query(text, value, (err, res)=> {
          if (err) {
            console.log(err.stack)
        }
      })
    }
    const createBerita = (req,res) => {

      // console.log("JUDUL BERITA ", req.body.judul_berita);
      // res.status(200).send(req.body.judul_berita)

      const text = 'INSERT INTO news(id, judul_berita, konten, kategori) VALUES ($1, $2, $3, $4) RETURNING *'
      const values = [req.body.id, req.body.judul_berita, req.body.konten, req.body.kategori]
      
      pool.query(text, values, (err, res) => {
   
        if (err) {
          console.log(err.stack)
    
      }
      
   }
      )
  }
      
  


    
    module.exports = {
      createBerita,
      updateBerita,
      getBerita,
      deleteBerita
     
    };
 // pool.query("INSERT INTO news(id, judul_berita,konten,kategori) VALUES(5, "apaakah", "kamu", "tahu") RETURNING *")
  // pool.query('SELECT * FROM news where id > 0', (err, res) => {
  //   console.log(err, res)
  //   pool.end()
  // })

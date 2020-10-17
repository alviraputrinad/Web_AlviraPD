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
      let vtabel = ''
      let ntabel = ''
      if(req.body.judul_berita != null){
        vtabel = req.body.judul_berita
        ntabel = 'judul_berita'
      }else if( req.body.konten != null){
        vtabel = req.body.konten
        ntabel = 'konten'
      }else if(req.body.kategori != null){
        vtabel = req.body.kategori
        ntabel = 'kategori'
      }
      console.log(ntabel)
      let text = "UPDATE news SET " + ntabel + " = " + vtabel + " WHERE id = " +  req.body.id
      console.log(text)
      //pool.query()
    }

    const createBerita = (req,res) => {

      // console.log("JUDUL BERITA ", req.body.judul_berita);
      // res.status(200).send(req.body.judul_berita)

      const text = 'INSERT INTO news(id, judul_berita, konten, kategori) VALUES ($1, $2, $3, $4) RETURNING *'
      const values = [req.body.id, req.body.judul_berita, req.body.konten, req.body.kategori]
      
      pool.query(text, values, (err, res) => {
        console.log("HELLO")
        // if (err) {
        //   console.log(err.stack)
        // } else {
        //   console.log(res.rows[0])
      }
      )
   }
      
  


    
    module.exports = {
      createBerita,
      updateBerita,
      getBerita
     
    };
 // pool.query("INSERT INTO news(id, judul_berita,konten,kategori) VALUES(5, "apaakah", "kamu", "tahu") RETURNING *")
  // pool.query('SELECT * FROM news where id > 0', (err, res) => {
  //   console.log(err, res)
  //   pool.end()
  // })

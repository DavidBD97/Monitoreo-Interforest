
const sql = require('mssql');

exports.getData = async (req, res) => {
    const pool = new sql.Request();

    const completo = 'ENTREGADO'
    pool.input('state', sql.VarChar, completo)
        .query(
        'SELECT C.nom_Cliente, C.correo, C.telefono, C.estado_Republica, C.CP, C.municipio_Ciudad,  P.id_Producto, P.pedido, P.fecha_Inicio, P.cant_PZAS, P.medida_M2, P.GA, P.estatus, P.fecha_Entrega, P.CORTE, P.ENCHAPE, P.EMBALAJE, P.tipo_EM, P.canto_A1, P.canto_A2, P.canto_L1, P.canto_L2, P.cant_Tablero, P.cant_RET, P.medida_ML, P.PTR, P.REM, P.lugar_Destino, P.tipo_Trasporte FROM CLIENTE AS C INNER JOIN PROYECTOS AS P ON C.id_Cliente = P.id_Cliente WHERE P.estatus <> @state ',
        (err, results) => {
            if (err) {
                console.error(err);
            } else {
                res.render('index', { results: results.recordset });
            }
        }
    );
};

exports.updateProyecto = async(req, res)=>{
    const pool = new sql.Request();
    const body = { ...req.body };

    pool.input('idPedido', sql.VarChar, body.id)
        .input('valorCorte', sql.Int, body.valorCorte)
        .input('valorEmbalaje',sql.Int, body.valorEmbalaje)
        .input('valorEnchape',sql.Int, body.valorEnchape)
        .input('valorEstatus',sql.VarChar, body.valorEstatus)
        .query('UPDATE PROYECTOS SET CORTE = @valorCorte, EMBALAJE = @valorEmbalaje, ENCHAPE = @valorEnchape, estatus = @valorEstatus WHERE pedido = @idPedido')
  };

  exports.getDataView = async (req, res) => {
    try {
        // Accede al valor del input usando req.query
        const pedido = {...req.params};

        console.log('Pedido:', pedido);

        // Resto del código...
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.getDataVisual = async(req , res )=>{
    try {
        const pool = new sql.Request();
        

        const visual = await pool.query('SELECT C.nom_Cliente, C.correo, C.telefono, C.estado_Republica, C.CP, C.municipio_Ciudad, T.cod_Tab, T.descripcion,  P.id_Producto, P.pedido, P.fecha_Inicio, P.cant_PZAS, P.medida_M2, P.GA, P.estatus, P.fecha_Entrega, P.CORTE, P.ENCHAPE, P.EMBALAJE, P.tipo_EM, P.canto_A1, P.canto_A2, P.canto_L1, P.canto_L2, P.cant_Tablero, P.cant_RET, P.medida_ML, P.PTR, P.REM, P.lugar_Destino, P.tipo_Trasporte FROM CLIENTE AS C INNER JOIN PROYECTOS AS P ON C.id_Cliente = P.id_Cliente INNER JOIN  PRODUCTO AS T ON P.id_Producto = T.id_Producto')


            
        
 
        return res.render('temporal', {results: visual.recordset})
         
    } catch (error) {
        // Manejar errores si es necesario
        console.error(error);
    }
};

exports.deleteProyecto = async(req, res)=>{
    try {
        const pool = new sql.Request();
        const body = { ...req.body };
        await pool.input('Idpedido', sql.VarChar, body.idPedido)
                  .query('DELETE PROYECTOS WHERE pedido = @Idpedido')
    } catch (error) {
        console.log(error)
    }    
};